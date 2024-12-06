const db = require("../../../database/databaseconfig");

const GetAllFuncionariosTarefas = async () => {
    return (
        await db.query(
            `SELECT ft.*, 
                    f.nome_funcionario, 
                    t.titulo_tarefa 
             FROM funcionariotarefa ft
             JOIN funcionario f ON ft.id_funcionario = f.id_funcionario
             JOIN tarefa t ON ft.id_tarefa = t.id_tarefa
             WHERE ft.removido_funcionariotarefa = false
             ORDER BY ft.dataatribuicao_funcionariotarefa DESC`
        )
    ).rows;
};

const GetFuncionarioTarefaByID = async (funcionarioTarefaIDPar) => {
    return (
        await db.query(
            `SELECT ft.*, 
                    f.nome_funcionario, 
                    t.titulo_tarefa 
             FROM funcionariotarefa ft
             JOIN funcionario f ON ft.id_funcionario = f.id_funcionario
             JOIN tarefa t ON ft.id_tarefa = t.id_tarefa
             WHERE ft.id_funcionariotarefa = $1 
               AND ft.removido_funcionariotarefa = false`,
            [funcionarioTarefaIDPar]
        )
    ).rows;
};

const InsertFuncionariosTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                `INSERT INTO funcionariotarefa 
                 VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)`,
                [
                    registroPar.id_funcionario,
                    registroPar.id_tarefa,
                    registroPar.observacao_funcionariotarefa,
                    registroPar.dataatribuicao_funcionariotarefa,
                    registroPar.horastrabalhadas_funcionariotarefa,
                    registroPar.removido_funcionariotarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlFuncionarioTarefa|InsertFuncionariosTarefas] ${error.message}`;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const UpdateFuncionariosTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                `UPDATE funcionariotarefa SET 
                     id_funcionario = $2, 
                     id_tarefa = $3, 
                     observacao_funcionariotarefa = $4, 
                     dataatribuicao_funcionariotarefa = $5, 
                     horastrabalhadas_funcionariotarefa = $6, 
                     removido_funcionariotarefa = $7 
                 WHERE id_funcionariotarefa = $1`,
                [
                    registroPar.id_funcionariotarefa,
                    registroPar.id_funcionario,
                    registroPar.id_tarefa,
                    registroPar.observacao_funcionariotarefa,
                    registroPar.dataatribuicao_funcionariotarefa,
                    registroPar.horastrabalhadas_funcionariotarefa,
                    registroPar.removido_funcionariotarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlFuncionarioTarefa|UpdateFuncionariosTarefas] ${error.detail}`;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const DeleteFuncionariosTarefas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                `UPDATE funcionariotarefa SET 
                     removido_funcionariotarefa = true 
                 WHERE id_funcionariotarefa = $1`,
                [registroPar.id_funcionariotarefa]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlFuncionarioTarefa|DeleteFuncionariosTarefas] ${error.detail}`;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllFuncionariosTarefas,
    GetFuncionarioTarefaByID,
    InsertFuncionariosTarefas,
    UpdateFuncionariosTarefas,
    DeleteFuncionariosTarefas,
};