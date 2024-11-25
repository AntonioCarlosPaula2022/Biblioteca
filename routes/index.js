const express = require('express');
const rota = express.Router();
const aluno = require('../models/aluno');
const livro = require('../models/livro');

// Rota principal:
rota.get('/', (req, res) => {
    res.render('index', { title: 'Bem-vindo à biblioteca!' });
});

// Rotas para alunos:
rota.get('/alunos', async (req, res) => {
    const alunos = await aluno.find().lean();
    res.render('aluno/index', { alunos: alunos });
});

rota.get('/alunos/cadastrar', (req, res) => {
    res.render('aluno/cadastrar');
});

rota.post('/alunos/cadastrar', async (req, res) => {
    await aluno.create(req.body);
    res.redirect('/alunos');
});

// Rotas para livros:
rota.get('/livros', async (req, res) => {
    const livros = await livro.find().lean();
    res.render('livro/index', { livros });
});

rota.get('/livros/cadastrar', async (req, res) => {
    res.render('livro/cadastrar');
});

rota.post('/livros/cadastrar', async (req, res) => {
    await livro.create(req.body);
    res.redirect('/livros');
});

module.exports = rota;



