const mdlFuncionario = require("../model/mdlFuncionario");

const GetAllFuncionarios = (req, res) =>
    (async () => {
        let registro = await mdlFuncionario.GetAllFuncionarios();
        for (let i = 0; i < registro.length; i++) {
            const row = registro[i];
            const formattedDate = row.datacontratacao_funcionario.toISOString().split('T')[0];
            row.datacontratacao_funcionario = formattedDate;
        }
        res.json({ status: "ok", "registro": registro });
    })();

const GetFuncionarioByID = (req, res) =>
    (async () => {
        const funcionarioID = parseInt(req.body.id_funcionario);
        let registro = await mdlFuncionario.GetFuncionarioByID(funcionarioID);
        res.json({ status: "ok", "registro": registro });
    })();

const InsertFuncionarios = (request, res) =>
    (async () => {
        const funcionarioREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionario.InsertFuncionarios(funcionarioREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const UpdateFuncionarios = (request, res) =>
    (async () => {
        const funcionarioREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionario.UpdateFuncionarios(funcionarioREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const DeleteFuncionarios = (request, res) =>
    (async () => {
        const funcionarioREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionario.DeleteFuncionarios(funcionarioREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

module.exports = {
    GetAllFuncionarios,
    GetFuncionarioByID,
    InsertFuncionarios,
    UpdateFuncionarios,
    DeleteFuncionarios
};