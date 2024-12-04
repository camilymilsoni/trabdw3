const db = require("../../../database/databaseconfig");

const GetAllTarefas = async () => {
    return (
        await db.query(
            "SELECT * " + "FROM tarefa where removido_tarefa = false ORDER BY titulo_tarefa ASC"
        )
    ).rows;
};

const GetTarefaByID = async (tarefaIDPar) => {
    return (
        await db.query(
            "SELECT * " +
            "FROM tarefa WHERE id_tarefa = $1 and removido_tarefa = false ORDER BY titulo_tarefa ASC",
            [tarefaIDPar]
        )
    ).rows;
};

const InsertTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO tarefa " + "values(default, $1, $2, $3, $4, $5)",
                [
                    registroPar.titulo_tarefa,
                    registroPar.descricao_tarefa,
                    registroPar.datacriacao_tarefa,
                    registroPar.prioridade_tarefa,
                    registroPar.removido_tarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|InsertTarefas] " + error.message;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const UpdateTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE tarefa SET " +
                "titulo_tarefa = $2, " +
                "descricao_tarefa = $3, " +
                "datacriacao_tarefa = $4, " +
                "prioridade_tarefa = $5, " +
                "removido_tarefa = $6 " +
                "WHERE id_tarefa = $1",
                [
                    registroPar.id_tarefa,
                    registroPar.titulo_tarefa,
                    registroPar.descricao_tarefa,
                    registroPar.datacriacao_tarefa,
                    registroPar.prioridade_tarefa,
                    registroPar.removido_tarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|UpdateTarefas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const DeleteTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE tarefa SET " + "removido_tarefa = true " + "WHERE id_tarefa = $1",
                [registroPar.id_tarefa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|DeleteTarefas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllTarefas,
    GetTarefaByID,
    InsertTarefas,
    UpdateTarefas,
    DeleteTarefas,
};