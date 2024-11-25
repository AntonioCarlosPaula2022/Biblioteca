const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Livro = require('../models/livro');

// Middleware para tratamento de erros
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Rota principal:
router.get('/', (req, res) => {
    res.render('index', { title: "Bem-vindo à biblioteca!" });
});

// Rotas para alunos:
router.get('/alunos', asyncHandler(async (req, res) => {
    const alunos = await Aluno.find().lean();
    res.render('aluno/index', { alunos });
}));

router.get('/alunos/cadastrar', (req, res) => {
    res.render('aluno/cadastrar');
});

router.post('/alunos/cadastrar', asyncHandler(async (req, res) => {
    await Aluno.create(req.body);
    res.redirect('/alunos');
}));

// Rotas para livros:
router.get('/livros', asyncHandler(async (req, res) => {
    const livros = await Livro.find().lean();
    res.render('livro/index', { livros });
}));

router.get('/livros/cadastrar', asyncHandler(async (req, res) => {
    const alunos = await Aluno.find().lean();
    res.render('livro/cadastrar', { alunos });
}));

router.post('/livros/cadastrar', asyncHandler(async (req, res) => {
    await Livro.create(req.body);
    res.redirect('/livros');
}));

module.exports = router;
