
require('dotenv').config();
const requires = require('./requires');
const {app, bodyParser, cors, express, moment} = requires;
const rotas = require('./rotas/rotas');
moment.tz.setDefault('America/Sao_Paulo');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
// este express.json é usado para ler conteudo do request(req)
app.use(express.json());
app.use('/', rotas);
// teste de git hub


let port = process.env.PORT || 3000;
app.listen(port,(req, res) => {
    console.log('servidor rodando na porta 3000');
}); 