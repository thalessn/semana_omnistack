const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require("./controlllers/PostController");
const LikeController = require("./controlllers/LikeController");

const routes = new express.Router();


 //uploadConfig = arquivo contendo as configurações
 //do mutter como a pasta ou o serviço de armazenamento.
 const upload = multer(uploadConfig);
 
 //Adiciona o objeto PostController correspondente a controladora
 //do Post a ser armazenado ao banco de dados
 //O segundo parâmetro é um middleware responsável por realizar a funcao
 // de upload da imagem ao servidor.
 //upload.single é utilizado quan há 1 arquivo somente.
 routes.post('/posts', upload.single('image'), PostController.store);

 //Retorna todos os post do banco de dados
 routes.get('/posts', PostController.index);

 //Adiciona umais uma curtida no post
 routes.post('/posts/:id/like', LikeController.store);


module.exports = routes;