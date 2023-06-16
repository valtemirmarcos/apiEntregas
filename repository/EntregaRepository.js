const {dataLocalHora, mostraErro, dtHjGravacao} = require('../functions/functions');
const models=require('../models');

let entrega = models.Entrega;
let pedido = models.Pedido;

class EntregaRepository{
    constructor(){

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

}
module.exports = new EntregaRepository();