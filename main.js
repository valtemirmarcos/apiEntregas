
const requires = require('./requires');
const {app, bodyParser, cors} = requires;
const rotas = require('./rotas/rotas');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', rotas);



let port = process.env.PORT || 3000;
app.listen(port,(req, res) => {
    console.log('servidor rodando na porta 3000');
});