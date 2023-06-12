const responseSuccess = (res, message) => {
    res.status(200).send({
            'status':'success',
            'data': message
    });
}
const responseFailure= (res, message) => {
    res.status(440).send({
            'status':'failure',
            'data': message
    });
}
const responseException = (res, error) =>{
    res.status(500).send({
            'status':'erro',
            'data': error
    });
}

module.exports = {
    responseSuccess:responseSuccess,
    responseFailure:responseFailure,
    responseException:responseException
}