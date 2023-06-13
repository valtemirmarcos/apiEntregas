const Controller = require('./Controller');
const loginRepository = require('../repository/LoginRepository');

class ControllerLogin{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }

  async testarLogin(req, res) {
    // console.log("ok");// Chama o método 'teste' herdado da classe pai (Controller)
    Controller.responseSuccess(res, "ok sim");
  }
  async Authentication(req, res) {
    // console.log("ok");// Chama o método 'teste' herdado da classe pai (Controller)
    Controller.responseSuccess(res, "ok sim");
  }
  async CreateLogin(req, res) {
    
    let saida = await loginRepository.createUser(req.body)
    Controller.responseSuccess(res, saida);
  }
}

module.exports = ControllerLogin;
