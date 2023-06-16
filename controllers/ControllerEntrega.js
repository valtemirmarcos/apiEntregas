const Controller = require('./Controller');
const entregaRepository = require('../repository/EntregaRepository');


class ControllerEntrega{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }
  async CreateEntrega(req, res) {
    try{
        const resp = await Controller.validaBuscarDadosToken(req, res);
        req.body.userId = resp.userId;
        const createEntrega = await entregaRepository.createEntrega(req.body);
        Controller.responseCreated(res, createEntrega);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async UpdateEntrega(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const updateEntrega = await entregaRepository.updateEntrega(req.body);
        Controller.responseCreated(res, updateEntrega);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async DeleteEntrega(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const deleteEntrega = await entregaRepository.deleteEntrega(req.params.idEntrega);
        Controller.responseCreated(res, deleteEntrega);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async ListarEntregasPorUsuario(req, res){
    try{
        const respostaToken = await Controller.validaBuscarDadosToken(req, res);
        req.query.userId = respostaToken.userId;
        const listarEntregasPorUsuario = await entregaRepository.listarEntregasPorUsuario(req.query);
        Controller.responseSuccess(res, listarEntregasPorUsuario);
    }catch(error){
        Controller.responseException(res, error);
    }
  }
}

module.exports = ControllerEntrega;
