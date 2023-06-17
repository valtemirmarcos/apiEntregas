const Controller = require('./Controller');
const loginRepository = require('../repository/LoginRepository');

class ControllerLogin{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }

  async testarLogin(req, res) {
     console.log("ok");// Chama o método 'teste' herdado da classe pai (Controller)
    Controller.responseSuccess(res, "ok sim");
  }
  async Authentication(req, res) {
    try{
      let saida = await loginRepository.authentication(req.body);
      if(saida==false){
        Controller.responseUnauthorized(res, "Usuario ou senha invalido!");
      }else{
        Controller.responseSuccess(res, saida);
      }
    }catch(error){
      Controller.responseException(res, error);
    }
  }
  async CreateLogin(req, res) {
    try{
      let saida = await loginRepository.createUser(req.body);
      let resposta="";
      if(saida==1){
        resposta = "Usuario criado com sucesso";
        Controller.responseCreated(res, resposta);
      }
    }catch(error){
      Controller.responseException(res, error);
    }
    
  }
  async UpdatePassword(req, res){
    try{
      let saida = await loginRepository.updatePassword(req.body);
      if(saida==0){
        Controller.responseUnauthorized(res, "senha antiga invalida");
      }else if(saida==1){
        Controller.responseSuccess(res, "senha alterada com sucesso");
      }else if(saida==2){
        Controller.responseException(res, "senha nao alterada!");
      }else{
        Controller.responseUnauthorized(res, "E-mail não existe no sistema");
      }
    }catch(error){
      console.log(error);
      Controller.responseException(res, "falha ao processar a api");
    }
  }
  async DeleteUser(req, res){
    try{    
      let saida = await loginRepository.deleteUser(req.params.idUser);
      if(saida==0){
          Controller.responseException(res, "usuario nao pode ser apagado");
      }else{
          Controller.responseSuccess(res, "usuario removido com sucesso");
      }
    }catch(error){
      console.log(error);
      Controller.responseException(res, "falha ao processar a api");
    }
    

  }
}

module.exports = ControllerLogin;
