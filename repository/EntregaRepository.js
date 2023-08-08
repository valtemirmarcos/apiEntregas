const {dataLocalHora, mostraErro, dtHjGravacao} = require('../functions/functions');
const models=require('../models');
const fs = require('fs');
const path = require('path');


let entrega = models.Entrega;
let pedido = models.Pedido;
let foto = models.Foto;

class EntregaRepository{
    constructor(){

    }
    async salvarFoto(json){
        
        if(json.hasOwnProperty('entregaId')){
            const verEntrega = await entrega.findByPk(json.entregaId);
            if(!verEntrega){
                mostraErro("codigo da entrega nao existente");
            }
            const caminho = json.caminho;
            const nome = path.basename(caminho);
            json.foto = nome;
            json.url = caminho;
            const imageData = fs.readFileSync(caminho);
            const base64Data = imageData.toString('base64');
            delete json.caminho;
            json.fotoB64 = base64Data;
            const inserir = await foto.create(json);
            if(inserir){
                return 1;
            }else{
                return 0;
            }
            
        }else{
            // "é necessario informar o codigo da entrega!"
            return 0;
        }

    }
    async createEntrega(json){
        if(json.hasOwnProperty('pedidoId')){
            const verPedido = await pedido.findByPk(json.pedidoId);
            if(!verPedido){
                mostraErro("codigo pedido nao existente");
            }
            const insert = await entrega.create(json);
            if(insert){
                pedido.findByPk(json.pedidoId).then((resposta)=>{
                    resposta.status=1
                    resposta.save();
                });
                return "entrega efetuada com sucesso";
            }else{
                mostraErro("falha ao gravar os dados da entrega!");
            }
        }else{
            mostraErro("é necessario informar o codigo pedido");
        }


    }
    async updateEntrega(json){
        if(json.hasOwnProperty('entregaId')){
            const entregaId = json.entregaId;
            const buscaEntrega = await entrega.findByPk(entregaId);

            if(buscaEntrega){
                delete json.entregaId;
                let update = buscaEntrega.update(json);
                if(update){
                    return "entrega alterada com sucesso";
                }else{
                    mostraErro("falha ao alterar entrega");
                }
            }else{
                mostraErro("codigo de entrega nao encontrado");
            }
            
        }else{
            mostraErro("faltou colocar os codigo da entrega");
        }
    }
    async deleteEntrega(idEntrega){
        const qdelete = await entrega.destroy({
            where:{id:idEntrega}
        });
        if(qdelete){
            return "id "+idEntrega+" deletado com sucesso";
        }else{
            mostraErro("falha ao deletar o registro:"+idEntrega);
        }
    }
    async listarEntregasPorUsuario(filtros){
        let jsonfiltro = [];
        if(filtros.status){
            jsonfiltro.push({status:filtros.status});
        }
        if(filtros.doc){
            jsonfiltro.push({docId:filtros.doc});
        }
        // return false;
        const buscaEntregues = await entrega.findAll({
            include: [{
                model: models.Pedido,
                required: true,
                where:{userId:[filtros.userId]}
            }],
            where:jsonfiltro
        });
        return buscaEntregues;
    }
    async finalizarEntregaPorUsuario(json){
        
        const jsonEntregas = json;
        const images = json.images;
        jsonEntregas.createdAt = dtHjGravacao();
        jsonEntregas.updatedAt = dtHjGravacao();
        delete jsonEntregas.images;
        
        const verStatusPedido = await pedido.findOne({
            where:{
                id:json.pedidoId,
                status:1
            }
        });
        if(verStatusPedido){
            mostraErro("O pedido "+verStatusPedido.numeroPedido+" já esta como status entregue");
            return '';
        }
        const insertEntrega = await entrega.create(jsonEntregas);
        if(insertEntrega){
            pedido.findByPk(json.pedidoId).then((resposta)=>{
                resposta.status=1
                resposta.save();
            });
            images.forEach(async (foto) => {
                let jsonFoto = {
                    'entregaId':insertEntrega.id,
                    'caminho':foto,
                    
                };
                const saida = await this.salvarFoto(jsonFoto);
                console.log(saida);
            });
            return "entrega efetuada com sucesso";
        }else{
            mostraErro("falha ao inserir a entrega");
        }
        
    }

}
module.exports = new EntregaRepository();