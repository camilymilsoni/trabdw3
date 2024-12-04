var express = require('express');
var router = express.Router();
var empresasApp = require("../apps/empresas/controller/ctlEmpresa");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

router.get('/ManutEmpresas', authenticationMiddleware, empresasApp.manutEmpresas);
router.get('/InsertEmpresas', authenticationMiddleware, empresasApp.insertEmpresas);
router.get('/ViewEmpresas/:id', authenticationMiddleware, empresasApp.viewEmpresas);
router.get('/UpdateEmpresas/:id', authenticationMiddleware, empresasApp.updateEmpresa);

router.post('/InsertEmpresas', authenticationMiddleware, empresasApp.insertEmpresas);
router.post('/UpdateEmpresas', authenticationMiddleware, empresasApp.updateEmpresa);
router.post('/DeleteEmpresas', authenticationMiddleware, empresasApp.deleteEmpresa);

module.exports = router;