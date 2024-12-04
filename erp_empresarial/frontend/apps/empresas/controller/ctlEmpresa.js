const axios = require("axios");
const moment = require("moment");

const manutEmpresas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        const resp = await axios.get(process.env.servidorBackend + "/getAllEmpresas", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).catch(error => {
            if (error.code === "ECONNREFUSED") {
                remoteMSG = "Servidor indisponível.";
            } else if (error.code === "ERR_BAD_REQUEST") {
                remoteMSG = "Usuário não autenticado.";
            } else {
                remoteMSG = error;
            }
            res.render("empresas/view/vwManutEmpresa.njk", {
                title: "Manutenção de Empresas",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        });

        if (!resp) {
            return;
        }

        res.render("empresas/view/vwManutEmpresa.njk", {
            title: "Manutenção de Empresas",
            data: resp.data.registro,
            erro: null,
            userName: userName,
        });
    })();

const insertEmpresas = async (req, res) =>
    (async () => {
        if (req.method == "GET") {
            return res.render("empresas/view/vwCrEmpresa.njk", {
                title: "Cadastro de Empresa",
                data: null,
                erro: null,
                userName: null,
            });
        } else {
            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.servidorBackend + "/insertEmpresas", regData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 5000,
                });

                res.json({
                    status: response.data.status,
                    msg: response.data.status,
                    data: response.data,
                    erro: null,
                });
            } catch (error) {
                console.error('Erro ao inserir dados no servidor backend:', error.message);
                res.json({
                    status: "Error",
                    msg: error.message,
                    data: response.data,
                    erro: null,
                });
            }
        }
    })();

const viewEmpresas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        try {
            if (req.method == "GET") {
                const id = req.params.id;
                oper = req.params.oper;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getEmpresaByID",
                    {
                        id_empresa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].datacriacao_empresa = moment(response.data.registro[0].datacriacao_empresa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("empresas/view/vwRUDEmpresa.njk", {
                        title: "Visualização da Empresa",
                        data: response.data.registro[0],
                        disabled: true,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlEmpresa|viewEmpresas] ID de empresa não localizado!");
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlEmpresa|viewEmpresas] Empresa não localizada!" });
            console.log("[ctlEmpresa.js|viewEmpresas] Try Catch: Erro não identificado", erro);
        }
    })();

const updateEmpresa = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        try {
            if (req.method == "GET") {
                const id = req.params.id;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getEmpresaByID",
                    {
                        id_empresa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].datacriacao_empresa = moment(response.data.registro[0].datacriacao_empresa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("empresas/view/vwRUDEmpresa.njk", {
                        title: "Atualização de Dados da Empresa",
                        data: response.data.registro[0],
                        disabled: false,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlEmpresa|updateEmpresa] Dados não localizados!");
                }
            } else {
                const regData = req.body;
                const token = req.session.token;

                try {
                    const response = await axios.post(process.env.servidorBackend + "/updateEmpresas", regData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        timeout: 5000,
                    });

                    res.json({
                        status: response.data.status,
                        msg: response.data.status,
                        data: response.data,
                        erro: null,
                    });
                } catch (error) {
                    console.error('[ctlEmpresa.js|updateEmpresa] Erro ao atualizar dados da empresa no servidor backend:', error.message);
                    res.json({
                        status: "Error",
                        msg: error.message,
                        data: response.data,
                        erro: null,
                    });
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlEmpresa.js|updateEmpresa] Empresa não localizada!" });
            console.log(
                "[ctlEmpresa.js|updateEmpresa] Try Catch: Erro não identificado",
                erro
            );
        }

    })();

const deleteEmpresa = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.servidorBackend + "/deleteEmpresas", regData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                timeout: 5000,
            });

            res.json({
                status: response.data.status,
                msg: response.data.status,
                data: response.data,
                erro: null,
            });
        } catch (error) {
            console.error('[ctlEmpresa.js|deleteEmpresa] Erro ao deletar dados da empresa no servidor backend:', error.message);
            res.json({
                status: "Error",
                msg: error.message,
                data: response.data,
                erro: null,
            });
        }
    })();

module.exports = {
    manutEmpresas,
    insertEmpresas,
    viewEmpresas,
    updateEmpresa,
    deleteEmpresa
};