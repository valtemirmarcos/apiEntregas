const Controller = require('./Controller');
const pedidoRepository = require('../repository/PedidoRepository');


class ControllerPedido{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }
  async CreatePedido(req, res) {
    try{
        const resp = await Controller.validaBuscarDadosToken(req, res);

        req.body.userId = resp.userId;
        const createPedido = await pedidoRepository.createPedido(req.body);
        Controller.responseCreated(res, createPedido);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async UpdatePedido(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);

        req.body.userId = resp.userId;
        const updatePedido = await pedidoRepository.updatePedido(req.body);
        Controller.responseCreated(res, updatePedido);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async DeletePedido(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const updatePedido = await pedidoRepository.deletePedido(req.params.idPedido);
        Controller.responseCreated(res, updatePedido);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async ListarPedidos(req, res){
    try{
        const respostaToken = await Controller.validaBuscarDadosToken(req, res);

        const listarPedidos = await pedidoRepository.listarPedidos(req.query, respostaToken.userId);
        Controller.responseSuccess(res, listarPedidos);
    }catch(error){
        Controller.responseException(res, error);
    }
  }
}

module.exports = ControllerPedido;
