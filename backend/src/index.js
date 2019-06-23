 const express = require('express');
 const path = require('path');
 const cors = require('cors');
 const app = express();

 //Divindo a API para escutar requisições http e websockets.
 //1º Informa o node que o servidor Http será o criado pelo express
 const server = require('http').Server(app);
//2º Instancia uma váriavel do socket io e passa como parâmetro o servidor criado.
const io = require('socket.io')(server);

//Requer o arquivo contendos as rotas
const routes = require('./routes');
//Reque a bliblioteca do mongoose 
const mongoose = require('mongoose');

//ABrea a conexão com o banco de dados
 mongoose.connect('mongodb+srv://thales:semana@cluster0-whg6x.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});

 //Cria um middleware para passar a variável io(socket.io) para todas as middleware que venham em seguida
 app.use((req, res, next) =>{
    req.io = io;
    next(); //Váriável responsável por não trava a API neste middleware (Conceito de callbacks)
 });

 //Habilita através da api uma forma de disponibilizar arquivos estáticos
 //para serem disponibilizados como conteúdo, com por exemplo inserir uma imagem em uma página HTML
 app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

 //Habilita a noss aplicação a receber requisições externas com domínios diferentes
 app.use(cors())

//Dia ao express as definições das rotas
app.use(routes);
 
//Obs: tem que utilizar a variável 'serve' ao invés de app. Pois é o servidor http criado.
server.listen(3003);

 