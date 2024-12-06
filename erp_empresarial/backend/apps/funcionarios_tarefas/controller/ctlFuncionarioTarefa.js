const mdlFuncionarioTarefa = require("../model/mdlFuncionarioTarefa");

const GetAllFuncionariosTarefas = (req, res) =>
    (async () => {
        let registro = await mdlFuncionarioTarefa.GetAllFuncionariosTarefas();
        for (let i = 0; i < registro.length; i++) {
            const row = registro[i];
            const formattedDate = row.dataatribuicao_funcionariotarefa.toISOString().split('T')[0];
            row.dataatribuicao_funcionariotarefa = formattedDate;
        }
        res.json({ status: "ok", "registro": registro });
    })();

const GetFuncionarioTarefaByID = (req, res) =>
    (async () => {
        const funcionariotarefaID = parseInt(req.body.id_funcionariotarefa);
        let registro = await mdlFuncionarioTarefa.GetFuncionarioTarefaByID(funcionariotarefaID);
        res.json({ status: "ok", "registro": registro });
    })();

const InsertFuncionariosTarefas = (request, res) =>
    (async () => {
        const funcionariotarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.InsertFuncionariosTarefas(funcionariotarefaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const UpdateFuncionariosTarefas = (request, res) =>
    (async () => {
        const funcionariotarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.UpdateFuncionariosTarefas(funcionariotarefaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const DeleteFuncionariosTarefas = (request, res) =>
    (async () => {
        const funcionariotarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.DeleteFuncionariosTarefas(funcionariotarefaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

module.exports = {
    GetAllFuncionariosTarefas,
    GetFuncionarioTarefaByID,
    InsertFuncionariosTarefas,
    UpdateFuncionariosTarefas,
    DeleteFuncionariosTarefas
};