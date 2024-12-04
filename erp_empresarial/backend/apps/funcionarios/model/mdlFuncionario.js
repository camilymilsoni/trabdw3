const db = require("../../../database/databaseconfig");

const GetAllFuncionarios = async () => {
    return (
        await db.query(
            "SELECT *, (SELECT nome_empresa from empresa where id_empresa = funcionario.id_empresa)" +
            "FROM funcionario where removido_funcionario = false ORDER BY nome_funcionario ASC"
        )
    ).rows;
};

const GetFuncionarioByID = async (funcionarioIDPar) => {
    return (
        await db.query(
            "SELECT *, (SELECT nome_empresa from empresa where id_empresa = funcionario.id_empresa)" +
            "FROM funcionario WHERE id_funcionario = $1 and removido_funcionario = false ORDER BY nome_funcionario ASC",
            [funcionarioIDPar]
        )
    ).rows;
};

const InsertFuncionarios = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO funcionario " + "values(default, $1, $2, $3, $4, $5, $6)",
                [
                    funcionarioREGPar.nome_funcionario,
                    funcionarioREGPar.salario_funcionario,
                    funcionarioREGPar.cargo_funcionario,
                    funcionarioREGPar.datacontratacao_funcionario,
                    funcionarioREGPar.removido_funcionario,
                    funcionarioREGPar.id_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|InsertFuncionarios] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const UpdateFuncionarios = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionario SET " +
                "nome_funcionario = $2, " +
                "salario_funcionario = $3, " +
                "cargo_funcionario = $4, " +
                "datacontratacao_funcionario = $5, " +
                "removido_funcionario = $6, " +
                "id_empresa = $7 " +
                "WHERE id_funcionario = $1",
                [
                    funcionarioREGPar.id_funcionario,
                    funcionarioREGPar.nome_funcionario,
                    funcionarioREGPar.salario_funcionario,
                    funcionarioREGPar.cargo_funcionario,
                    funcionarioREGPar.datacontratacao_funcionario,
                    funcionarioREGPar.removido_funcionario,
                    funcionarioREGPar.id_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|UpdateFuncionarios] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const DeleteFuncionarios = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionario SET " + "removido_funcionario = true " + "WHERE id_funcionario = $1",
                [funcionarioREGPar.id_funcionario]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|DeleteFuncionarios] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllFuncionarios,
    GetFuncionarioByID,
    InsertFuncionarios,
    UpdateFuncionarios,
    DeleteFuncionarios,
};