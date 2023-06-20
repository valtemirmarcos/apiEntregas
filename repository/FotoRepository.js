const {dataLocalHora, mostraErro, dtHjGravacao} = require('../functions/functions');
const models=require('../models');
const fs = require('fs');
const { Op } = require('sequelize');
const mime = require('mime-types');

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
            const caminho = json.caminho;
            const imageData = fs.readFileSync(caminho);
            const base64Data = imageData.toString('base64');
            delete json.caminho;
            json.fotoB64 = base64Data;
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
    async listarFotosPorEntrega(idEntrega){
        console.log(idEntrega);
        const query = await foto.findAll({
            where:{entregaId:idEntrega}
        });
        return query;
    }
    async listarImagens(json){
        // console.log(idEntrega);
        const query = await foto.findAll({
            where: {
                entregaId:json.entregaId,
                fotoB64: {
                    [Op.not]: null
                }
            }
        });
        if(query){
            query.forEach(resposta =>{
                const base64String = resposta.fotoB64;
                const nomeArquivo = json.caminho+"/"+resposta.foto;
                const base64Data = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(nomeArquivo, buffer);
                console.log(resposta);
            });


            return "imagens geradas no diretorio "+json.caminho;
        }else{
             mostraErro("imagem nao gerada");
        }
        
    }

}
module.exports = new FotoRepository();