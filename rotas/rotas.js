const requires = require('../requires');
require('express-group-routes');
const { express} = requires;
const rotas = express.Router();
const ControllerLogin = require('../controllers/ControllerLogin');
const mcontrollerLogin = new ControllerLogin();
const ControllerPedido = require('../controllers/ControllerPedido');
const controllerPedido = new ControllerPedido();
const ControllerEntrega = require('../controllers/ControllerEntrega');
const controllerEntrega = new ControllerEntrega();
const ControllerFoto = require('../controllers/ControllerFoto');
const controllerFoto = new ControllerFoto();

    rotas.get('/teste', mcontrollerLogin.testarLogin);
    
    rotas.group('/login',(rota) => {
        rota.post('/',mcontrollerLogin.Authentication);
        rota.post('/create',mcontrollerLogin.CreateLogin);
        rota.post('/updatePassword',mcontrollerLogin.UpdatePassword);
        rota.get('/delete/:idUser',mcontrollerLogin.DeleteUser);
    });
    rotas.group('/pedidos',(rota) => {
        rota.get('/create',controllerPedido.CreatePedido);
        rota.get('/update',controllerPedido.UpdatePedido);
        rota.get('/delete/:idPedido',controllerPedido.DeletePedido);
        rota.get('/',controllerPedido.ListarPedidos);
    });
    rotas.group('/entregas',(rota) => {
        rota.get('/create',controllerEntrega.CreateEntrega);
        rota.get('/update',controllerEntrega.UpdateEntrega);
        rota.get('/delete/:idEntrega',controllerEntrega.DeleteEntrega);
        rota.get('/',controllerEntrega.ListarEntregasPorUsuario);
        rota.post('/finalizar',controllerEntrega.FinalizarEntregaPorUsuario);
    });
    rotas.group('/fotos',(rota) => {
        rota.get('/create',controllerFoto.CreateFoto);
        rota.get('/update',controllerFoto.UpdateFoto);
        rota.get('/delete/:idFoto',controllerFoto.DeleteFoto);
        rota.get('/listaFotos/:idEntrega',controllerFoto.ListarFotosPorEntrega);
        rota.get('/listarImagens',controllerFoto.ListarImagens);
    });

module.exports = rotas;