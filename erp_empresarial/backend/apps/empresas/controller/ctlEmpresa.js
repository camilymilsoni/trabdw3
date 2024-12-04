const mdlEmpresa = require("../model/mdlEmpresa");

const GetAllEmpresas = (req, res) =>
    (async () => {
        let registro = await mdlEmpresa.GetAllEmpresas();
        for (let i = 0; i < registro.length; i++) {
            const row = registro[i];   
            const formattedDate = row.datacriacao_empresa.toISOString().split('T')[0];
            row.datacriacao_empresa = formattedDate;
            
        }
        res.json({ status: "ok", registro: registro });
    })();

const GetEmpresaByID = (req, res) =>
    (async () => {
        const empresaID = parseInt(req.body.id_empresa);
        let registro = await mdlEmpresa.GetEmpresaByID(empresaID);

        res.json({ status: "ok", registro: registro });
    })();

const InsertEmpresas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlEmpresa.InsertEmpresas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const UpdateEmpresas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlEmpresa.UpdateEmpresas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const DeleteEmpresas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlEmpresa.DeleteEmpresas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

module.exports = {
    GetAllEmpresas,
    GetEmpresaByID,
    InsertEmpresas,
    UpdateEmpresas,
    DeleteEmpresas
};