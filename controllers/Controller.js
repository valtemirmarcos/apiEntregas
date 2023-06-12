class Controller {
  constructor() {
    // Alguma lógica de inicialização
  }

    responseSuccess = (res, message) => {
        res.status(200).send({
                'status':'success',
                'data': message
        });
    }
    responseCreated = (res, message) => {
        res.status(201).send({
                'status':'success',
                'data': message
        });
    }
    responseNoContent = (res, message) => {
        res.status(204).send({
                'status':'no-content',
                'data': message
        });
    }
    responseBadRequest= (res, message) => {
        res.status(400).send({
                'status':'failure',
                'data': message
        });
    }
    responseUnauthorized= (res, message) => {
        res.status(401).send({
                'status':'failure',
                'data': message
        });
    }
    responseNotFound= (res, message) => {
        res.status(404).send({
                'status':'exception',
                'data': message
        });
    }
    responseException = (res, error) =>{
        res.status(500).send({
                'status':'exception',
                'data': error
        });
    }
}

module.exports = new Controller();
