const mdlTarefa = require("../model/mdlTarefa");

const GetAllTarefas = (req, res) =>
    (async () => {
        let registro = await mdlTarefa.GetAllTarefas();
        for (let i = 0; i < registro.length; i++) {
            const row = registro[i];   
            const formattedDate = row.datacriacao_tarefa.toISOString().split('T')[0];
            row.datacriacao_tarefa = formattedDate;
            
        }
        res.json({ status: "ok", registro: registro });
    })();

const GetTarefaByID = (req, res) =>
    (async () => {
        const tarefaID = parseInt(req.body.id_tarefa);
        let registro = await mdlTarefa.GetTarefaByID(tarefaID);

        res.json({ status: "ok", registro: registro });
    })();

const InsertTarefas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlTarefa.InsertTarefas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const UpdateTarefas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlTarefa.UpdateTarefas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const DeleteTarefas = (req, res) =>
    (async () => {
        const registro = req.body;
        let { msg, linhasAfetadas } = await mdlTarefa.DeleteTarefas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

module.exports = {
    GetAllTarefas,
    GetTarefaByID,
    InsertTarefas,
    UpdateTarefas,
    DeleteTarefas
};