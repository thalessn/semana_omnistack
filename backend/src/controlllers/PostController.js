const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        //O simbolo menos antes da palavra createdAt
        //é utilizado para ordenar de forma inversa.
        const posts = await Post.find().sort('-createAt');

        return res.json(posts);
    },

    async store(req,res){
       const { author, place, description, hashtags } = req.body;
       //variável contendo o nome do arquivo vindo na requisição
       const { filename: image} = req.file;

       //Alterar a extensão da imagem de PNG para JPG
       const [name] = image.split('.');
       const FileName = `${name}.jpg`;
       
       //Reduz o tamanho da imagem a ser salva
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', FileName)
        )

       //Apaga a imagem original enviado pelo usuário e deixa somente imagem compactado na pasta resized
       fs.unlinkSync(req.file.path);
               
       const post = await Post.create({
           author,
           place,
           description,
           hashtags,
           image: FileName,
       });

       //Avisa para o websocket que foi cadastrado um novo post
       req.io.emit('post', post);

       return res.json(post);
    }
};