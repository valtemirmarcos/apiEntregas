const {dataLocalHora, mostraErro, dtHjGravacao} = require('../functions/functions');
const models=require('../models');

let foto = models.Foto;
let entrega = models.Entrega;

class FotoRepository{
    constructor(){

    }

    async createFoto(json){
        if(json.hasOwnProperty('entregaId')){
            const verEntrega = await entrega.findByPk(json.entregaId);
            if(!verEntrega){
                mostraErro("codigo da entrega nao existente!");
            }
            const inserir = await foto.create(json);
            if(inserir){
                return "foto inserida com sucesso";
            }else{
                mostraErro("falha ao inserir a foto");
            }
            
        }else{
            mostraErro("é necessario informar o codigo da entrega!");
        }

    }
    async updateFoto(json){
        return 'ok';
    }
    async deleteFoto(idFoto){
        const delfoto = await foto.destroy({
            where:{id:idFoto}
        });
        if(delfoto){
            // obs: falta setar no s3
            return 'foto deletada com sucesso';
        }else{
            mostraErro("foto nao removida");
        }
    }
    async listarFotosPorEntrega(json){
        return 'ok';
    }


}
module.exports = new FotoRepository();