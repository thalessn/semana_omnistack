 const express = require('express');
 const app = express();

//Requer o arquivo contendos as rotas
const routes = require('./routes');
//Reque a bliblioteca do mongoose 
const mongoose = require('mongoose');

 mongoose.connect('mongodb+srv://thales:mocros147@cluster0-whg6x.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});

 app.listen(3000);

 //Dia ao express as definições das rotas
 app.use(routes);
 