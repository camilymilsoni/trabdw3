var express = require('express');
var router = express.Router();
var funcionariosApp = require("../apps/funcionarios/controller/ctlFuncionario");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

router.get('/ManutFuncionarios', authenticationMiddleware, funcionariosApp.manutFuncionarios);
router.get('/InsertFuncionarios', authenticationMiddleware, funcionariosApp.insertFuncionarios);
router.get('/ViewFuncionarios/:id', authenticationMiddleware, funcionariosApp.viewFuncionarios);
router.get('/UpdateFuncionarios/:id', authenticationMiddleware, funcionariosApp.updateFuncionario);

router.post('/InsertFuncionarios', authenticationMiddleware, funcionariosApp.insertFuncionarios);
router.post('/UpdateFuncionarios', authenticationMiddleware, funcionariosApp.updateFuncionario);
router.post('/DeleteFuncionarios', authenticationMiddleware, funcionariosApp.deleteFuncionario);

module.exports = router;