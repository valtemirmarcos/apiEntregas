const requires = require('../requires');
require('express-group-routes');
const { express} = requires;
const rotas = express.Router();
const ControllerLogin = require('../controllers/ControllerLogin');
const mcontrollerLogin = new ControllerLogin();

    rotas.get('/teste', mcontrollerLogin.testarLogin);
    
    rotas.group('/login',(rota) => {
        rota.post('/',mcontrollerLogin.Authentication);
        rota.post('/create',mcontrollerLogin.CreateLogin);
    })

module.exports = rotas;