const axios = require("axios");
const moment = require("moment");

const manutFuncionarios = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        const resp = await axios.get(process.env.servidorBackend + "/getAllFuncionarios", {
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
            res.render("funcionarios/view/vwManutFuncionario.njk", {
                title: "Manutenção de Funcionários",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        });

        if (!resp) {
            return;
        }

        res.render("funcionarios/view/vwManutFuncionario.njk", {
            title: "Manutenção de Funcionários",
            data: resp.data.registro,
            erro: null,
            userName: userName,
        });
    })();

const insertFuncionarios = async (req, res) =>
    (async () => {
        if (req.method == "GET") {
            const token = req.session.token;

            const empresas = await axios.get(
              process.env.servidorBackend + "/GetAllEmpresas", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            });

            return res.render("funcionarios/view/vwCrFuncionario.njk", {
                title: "Cadastro de Funcionário",
                data: null,
                erro: null,
                empresa: empresas.data.registro,
                userName: null,
            });
        } else {
            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.servidorBackend + "/insertFuncionarios", regData, {
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

const viewFuncionarios = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        try {
            if (req.method == "GET") {
                const id = req.params.id;
                oper = req.params.oper;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getFuncionarioByID",
                    {
                        id_funcionario: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status == "ok") {
                    const empresas = await axios.get(
                        process.env.servidorBackend + "/GetAllEmpresas", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}` 
                        }
                    });

                    response.data.registro[0].datacontratacao_funcionario = moment(response.data.registro[0].datacontratacao_funcionario).format(
                        "YYYY-MM-DD"
                    );

                    res.render("funcionarios/view/vwRUDFuncionario.njk", {
                        title: "Visualização do Funcionário",
                        data: response.data.registro[0],
                        disabled: true,
                        empresa: empresas.data.registro,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlFuncionario|viewFuncionarios] ID de funcionário não localizado!");
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlFuncionario|viewFuncionarios] Funcionário não localizado!" });
            console.log("[ctlFuncionario.js|viewFuncionarios] Try Catch: Erro não identificado", erro);
        }
    })();

const updateFuncionario = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        try {
            if (req.method == "GET") {
                const id = req.params.id;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getFuncionarioByID",
                    {
                        id_funcionario: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                if (response.data.status == "ok") {
                    const empresas = await axios.get(
                        process.env.servidorBackend + "/GetAllEmpresas", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`
                        }
                    });

                    response.data.registro[0].datacontratacao_funcionario = moment(response.data.registro[0].datacontratacao_funcionario).format(
                        "YYYY-MM-DD"
                    );

                    res.render("funcionarios/view/vwRUDFuncionario.njk", {
                        title: "Atualização de Dados do Funcionário",
                        data: response.data.registro[0],
                        disabled: false,
                        empresa: empresas.data.registro,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlFuncionario|updateFuncionario] Dados não localizados!");
                }
            } else {
                const regData = req.body;
                const token = req.session.token;

                try {
                    const response = await axios.post(process.env.servidorBackend + "/updateFuncionarios", regData, {
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
                    console.error('[ctlFuncionario.js|updateFuncionario] Erro ao atualizar dados do funcionário no servidor backend:', error.message);
                    res.json({
                        status: "Error",
                        msg: error.message,
                        data: response.data,
                        erro: null,
                    });
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlFuncionario.js|updateFuncionario] Funcionário não localizado!" });
            console.log(
                "[ctlFuncionario.js|updateFuncionario] Try Catch: Erro não identificado",
                erro
            );
        }

    })();

const deleteFuncionario = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.servidorBackend + "/deleteFuncionarios", regData, {
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
            console.error('[ctlFuncionario.js|deleteFuncionario] Erro ao deletar dados do funcionário no servidor backend:', error.message);
            res.json({
                status: "Error",
                msg: error.message,
                data: response.data,
                erro: null,
            });
        }
    })();

module.exports = {
    manutFuncionarios,
    insertFuncionarios,
    viewFuncionarios,
    updateFuncionario,
    deleteFuncionario
};