
const {dataLocalHora, mostraErro} = require('../functions/functions');
const models=require('../models');

let pedido = models.Pedido;

class LoginRepository{
    constructor(){

    }

    async createPedido(json){
        json.createdAt = dataLocalHora();
        json.updatedAt = dataLocalHora();
        let create = await pedido.create(json);
        if(create){
            return 'pedido criado sucesso';
        }else{
            const err={
                mensagem:'falha ao gravar pedido'
            }
            throw err.mensagem;
        }
    }
    // {}
    async updatePedido(json){
        if(json.hasOwnProperty('pedidoId')){
            const pedidoId=json.pedidoId
            const buscarPedido = await pedido.findOne({where:{id:pedidoId}});
            if(buscarPedido){
                delete json.pedidoId;
                buscarPedido.update(json);
                return "Pedido Alterado com Sucesso!";
            }else{
                mostraErro("pedido nao encontrado");
            }
        }else{
            mostraErro("faltou o id do pedido");
        }
    }
    async deletePedido(idPedido){
        const deletaPedido = pedido.destroy({
            where:{id:idPedido}
        });
        if(deletaPedido){
            return "Pedido deletado com sucesso!";
        }else{
            mostraErro("falha ao deletar o pedido");
        }
    }
    async listarPedidos(parametros, userId){
        const filtroStatus = parametros.status;
        const query = pedido.findAll({
            where:{status:filtroStatus, userId:userId}
        });
        return query;
    }

}
module.exports = new LoginRepository();