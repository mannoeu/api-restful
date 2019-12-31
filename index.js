// IMPORTS
const restify = require('restify');
const errors = require('restify-errors');

// SERVER
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

// CONEXÃO COM BANCO
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'database'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// CONFIGURAÇÃO DA PORTA
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// ROTAS REST
// Listar todos
server.get('/', (req, res, next) => {
    knex('teste').then((dados) =>{
        res.send(dados);
    }, next)
});

// Cadastrar
server.post('/create', (req, res, next) => {
    knex('teste')
    .insert(req.body)
    .then((dados) =>{
        res.send(dados);
    }, next)
});

// Listar um específico
server.get('/show/:id', (req, res, next) => {
    const { id } = req.params;

    knex('teste')
    .where('id', id)
    .first()
    .then((dados) =>{
        if(!dados)
        return res.send(new errors.BadRequestError('Dado não encontrado'));
        res.send(dados);
    }, next)
});

// Atualizar
server.put('/update/:id', (req, res, next) => {
    const { id } = req.params;

    knex('teste')
    .where('id', id)
    .update(req.body)
    .then((dados) =>{
        if(!dados)
        return res.send(new errors.BadRequestError('Dado não encontrado'));
        res.send('Dados atualizados');
    }, next)
});

// Deletar
server.del('/delete/:id', (req, res, next) => {
    const { id } = req.params;

    knex('teste')
    .where('id', id)
    .delete(req.body)
    .then((dados) =>{
        if(!dados)
        return res.send(new errors.BadRequestError('Dado não encontrado'));
        res.send('Dados removidos');
    }, next)
});