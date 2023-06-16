const {moment} = require('../requires');

var strPad = (i,l,s) => {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = s + o;
	}
	return o;
};
var dataLocal = () => {
    var dt = new Date();
    return dt.getFullYear() + "-" + strPad(dt.getMonth()+1,2,'0') + "-" + dt.getDate();
}
var dataLocalHora = () => {
    var dt = new Date();
    return dt.getFullYear() + "-" + strPad(dt.getMonth()+1,2,'0') + "-" + dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
}
const mostraErro = (mensagem) => {
    const err={
        mensagem:mensagem
    }
    throw err.mensagem;    
}
const dtHjGravacao = () => {
    const now = moment().tz('America/Sao_Paulo');
    return now.format('YYYY-MM-DD HH:mm:ss');
}
module.exports = {
    strPad:strPad,
    dataLocal:dataLocal,
    dataLocalHora:dataLocalHora,
    mostraErro:mostraErro,
    dtHjGravacao:dtHjGravacao
}