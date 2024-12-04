var createError = require('http-errors');
var nunjucks = require("nunjucks")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');

const envFilePath = path.resolve(__dirname, './.env');
require('dotenv').config({ path: envFilePath });

const port = process.env.port
var rtIndex = require('./routes/rtIndex');
var rtEmpresa = require('./routes/rtEmpresa');
var rtFuncionario = require('./routes/rtFuncionario');
var rtTarefa = require('./routes/rtTarefa');
var rtFuncionarioTarefa = require('./routes/rtFuncionarioTarefa');
jwtchave = process.env.jwtChave;

var app = express();

nunjucks.configure('apps', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.jwtChave, 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);

app.use('/', rtIndex);
app.use('/Empresas', rtEmpresa);
app.use('/Funcionarios', rtFuncionario);
app.use('/Tarefas', rtTarefa);
app.use('/FuncionariosTarefas', rtFuncionarioTarefa);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})