const Controller = require('./Controller');

class ControllerLogin{
  constructor() {
    // super(); // Chama o construtor da classe pai
    // Alguma lógica de inicialização específica do ControllerLogin
  }

  async testarLogin(req, res) {
    // console.log("ok");// Chama o método 'teste' herdado da classe pai (Controller)
    Controller.responseSuccess(res, "ok sim");
  }
}

module.exports = ControllerLogin;
