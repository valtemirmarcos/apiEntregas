
const requires = require('./requires');
const {app, bodyParser, cors, express} = requires;
const rotas = require('./rotas/rotas');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
// este express.json é usado para ler conteudo do request(req)
app.use(express.json());
app.use('/', rotas);



let port = process.env.PORT || 3000;
app.listen(port,(req, res) => {
    console.log('servidor rodando na porta 3000');
});