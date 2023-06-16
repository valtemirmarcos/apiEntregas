const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const salt =  bcrypt.genSaltSync(10);
const {dataLocalHora, mostraErro} = require('../functions/functions');
const models=require('../models');
let user = models.User;

class LoginRepository{
    constructor(){

    }
    gerarSenha(json){
        let senha = bcrypt.hashSync(json.password,salt);
        return senha;
    }
    async createUser(json){
        const verificaEmail = await user.findOne({where:{email:json.email}});
        if(verificaEmail){
            mostraErro("email ja existe na base");
        }
        json.password = this.gerarSenha(json);
        json.accessToken = uuidv4();
        json.createdAt = dataLocalHora();
        json.updatedAt = dataLocalHora();

        let create = await user.create(json);
        if(create){
            return 1;
        }else{
            mostraErro("usuario nao pode ser criado");
        }
    }
    async authentication(json){
        let result=false;
        let findUser="";
        if(json.hasOwnProperty('accessToken')){
            findUser = await user.findOne({where:{accessToken:json.accessToken}});
            console.log(findUser);
            if(findUser){
                result = true;
            }
        }else{
            findUser = await user.findOne({where:{email:json.email}});
            result = await bcrypt.compare(json.password, findUser.password);
        }

        if(result){
            const payload = {
                userId: findUser.id,
                userEmail: findUser.email
            };
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secretKey);
            // token para vencer em 1 hora
            // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return {
                'id':findUser.id,
                'email':findUser.email,
                'accessToken':findUser.accessToken,
                'token':token
            };
        }else{
            return false;
        }
    }
    async updatePassword(json){
        
        const findUser = await user.findOne({where:{email:json.email}});
        if(findUser){
            if(!json.admin){
                console.log("sim");
                const result = await bcrypt.compare(json.password, findUser.password);
                if(!result){
                    return 0;
                }
            }
            json.password = json.newPassword;
            findUser.password = this.gerarSenha(json);
            let update = await findUser.save();
            if(update){
                return 1; 
            }else{
                return 2;
            }
        }else{
            return 3;
        }
    }
    async deleteUser(idUser){
        const deleteUser = await user.destroy({
            where:{id:idUser}
        });
        if(deleteUser){
            return 1;
        }else{
            return 0;
        }
    }
}
module.exports = new LoginRepository();