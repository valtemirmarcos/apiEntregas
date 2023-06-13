const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const salt =  bcrypt.genSaltSync(10);

class LoginRepository{
    constructor(){

    }
    gerarSenha(json){
        let senha = bcrypt.hashSync(json.password,salt);
        return senha;
    }
    async createUser(json){
        json.password = this.gerarSenha(json);
        json.accessToken = uuidv4();
        json.createdAt = new Date();
        json.updatedAt = new Date();
        return json;
    }
}
module.exports = new LoginRepository();