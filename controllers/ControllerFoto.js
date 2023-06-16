const Controller = require('./Controller');
const fotoRepository = require('../repository/FotoRepository');


class ControllerFoto{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }
  async CreateFoto(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const createFoto = await fotoRepository.createFoto(req.body);
        Controller.responseCreated(res, createFoto);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async UpdateFoto(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const updateFoto = await fotoRepository.updateFoto(req.body);
        Controller.responseCreated(res, updateFoto);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async DeleteFoto(req, res) {
    try{
        await Controller.validaBuscarDadosToken(req, res);
        const deleteFoto = await fotoRepository.deleteFoto(req.params.idFoto);
        Controller.responseCreated(res, deleteFoto);
    }catch(error){
        Controller.responseException(res, error);
    }
    
  }
  async ListarFotosPorEntrega(req, res){
    try{
        const respostaToken = await Controller.validaBuscarDadosToken(req, res);
        req.query.userId = respostaToken.userId;
        const listarFotosPorEntrega = await fotoRepository.listarFotosPorEntrega(req.query);
        Controller.responseSuccess(res, listarFotosPorEntrega);
    }catch(error){
        Controller.responseException(res, error);
    }
  }
}

module.exports = ControllerFoto;
