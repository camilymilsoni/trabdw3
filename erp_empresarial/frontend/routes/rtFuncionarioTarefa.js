var express = require('express');
var router = express.Router();
var funcionariosTarefasApp = require("../apps/funcionarios_tarefas/controller/ctlFuncionarioTarefa");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

router.get('/ManutFuncionariosTarefas', authenticationMiddleware, funcionariosTarefasApp.manutFuncionariosTarefas);
router.get('/InsertFuncionariosTarefas', authenticationMiddleware, funcionariosTarefasApp.insertFuncionariosTarefas);
router.get('/ViewFuncionariosTarefas/:id', authenticationMiddleware, funcionariosTarefasApp.viewFuncionariosTarefas);
router.get('/UpdateFuncionariosTarefas/:id', authenticationMiddleware, funcionariosTarefasApp.updateFuncionarioTarefa);

router.post('/InsertFuncionariosTarefas', authenticationMiddleware, funcionariosTarefasApp.insertFuncionariosTarefas);
router.post('/UpdateFuncionariosTarefas', authenticationMiddleware, funcionariosTarefasApp.updateFuncionarioTarefa);
router.post('/DeleteFuncionariosTarefas', authenticationMiddleware, funcionariosTarefasApp.deleteFuncionarioTarefa);

module.exports = router;