const db = require("../../../database/databaseconfig");

const GetAllEmpresas = async () => {
    return (
        await db.query(
            "SELECT * " + "FROM empresa where removido_empresa = false ORDER BY nome_empresa ASC"
        )
    ).rows;
};

const GetEmpresaByID = async (empresaIDPar) => {
    return (
        await db.query(
            "SELECT * " +
            "FROM empresa WHERE id_empresa = $1 and removido_empresa = false ORDER BY nome_empresa ASC",
            [empresaIDPar]
        )
    ).rows;
};

const InsertEmpresas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO empresa " + "values(default, $1, $2, $3, $4, $5)",
                [
                    registroPar.nome_empresa,
                    registroPar.cnpj_empresa,
                    registroPar.datacriacao_empresa,
                    registroPar.receitaanual_empresa,
                    registroPar.removido_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|InsertEmpresas] " + error.message;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const UpdateEmpresas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE empresa SET " +
                "nome_empresa = $2, " +
                "cnpj_empresa = $3, " +
                "datacriacao_empresa = $4, " +
                "receitaanual_empresa = $5, " +
                "removido_empresa = $6 " +
                "WHERE id_empresa = $1",
                [
                    registroPar.id_empresa,
                    registroPar.nome_empresa,
                    registroPar.cnpj_empresa,
                    registroPar.datacriacao_empresa,
                    registroPar.receitaanual_empresa,
                    registroPar.removido_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|UpdateEmpresas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const DeleteEmpresas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE empresa SET " + "removido_empresa = true " + "WHERE id_empresa = $1",
                [registroPar.id_empresa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|DeleteEmpresas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllEmpresas,
    GetEmpresaByID,
    InsertEmpresas,
    UpdateEmpresas,
    DeleteEmpresas,
};