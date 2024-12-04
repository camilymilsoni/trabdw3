var express = require('express');
var router = express.Router();
var tarefasApp = require("../apps/tarefas/controller/ctlTarefa");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

router.get('/ManutTarefas', authenticationMiddleware, tarefasApp.manutTarefas);
router.get('/InsertTarefas', authenticationMiddleware, tarefasApp.insertTarefas);
router.get('/ViewTarefas/:id', authenticationMiddleware, tarefasApp.viewTarefas);
router.get('/UpdateTarefas/:id', authenticationMiddleware, tarefasApp.updateTarefa);

router.post('/InsertTarefas', authenticationMiddleware, tarefasApp.insertTarefas);
router.post('/UpdateTarefas', authenticationMiddleware, tarefasApp.updateTarefa);
router.post('/DeleteTarefas', authenticationMiddleware, tarefasApp.deleteTarefa);

module.exports = router;