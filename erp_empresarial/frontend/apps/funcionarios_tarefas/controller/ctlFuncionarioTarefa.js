const axios = require("axios");
const moment = require("moment");

const manutFuncionariosTarefas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        const resp = await axios.get(process.env.servidorBackend + "/getAllFuncionariosTarefas", {
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
            res.render("funcionarios_tarefas/view/vwManutFuncTarefa.njk", {
                title: "Manutenção de Funcionários e Tarefas",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        });

        if (!resp) {
            return;
        }

        res.render("funcionarios_tarefas/view/vwManutFuncTarefa.njk", {
            title: "Manutenção de Funcionários e Tarefas",
            data: resp.data.registro,
            erro: null,
            userName: userName,
        });
    })();

const insertFuncionariosTarefas = async (req, res) =>
    (async () => {
        if (req.method == "GET") {
            const token = req.session.token;

            const funcionarios = await axios.get(
              process.env.servidorBackend + "/GetAllFuncionarios", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            });

            const tarefas = await axios.get(
                process.env.servidorBackend + "/GetAllTarefas", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });

            return res.render("funcionarios_tarefas/view/vwCrFuncTarefa.njk", {
                title: "Cadastro de Atribuição",
                data: null,
                erro: null,
                funcionario: funcionarios.data.registro,
                tarefa: tarefas.data.registro,
                userName: null,
            });
        } else {
            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.servidorBackend + "/insertFuncionariosTarefas", regData, {
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

const viewFuncionariosTarefas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        try {
            if (req.method == "GET") {
                const id = req.params.id;
                oper = req.params.oper;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getFuncionarioTarefaByID",
                    {
                        id_funcionariotarefa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status == "ok") {
                    const funcionarios = await axios.get(
                        process.env.servidorBackend + "/GetAllFuncionarios", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}` 
                        }
                    });

                    const tarefas = await axios.get(
                        process.env.servidorBackend + "/GetAllTarefas", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}` 
                        }
                    });

                    response.data.registro[0].dataatribuicao_funcionariotarefa = moment(response.data.registro[0].dataatribuicao_funcionariotarefa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("funcionarios_tarefas/view/vwRUDFuncTarefa.njk", {
                        title: "Visualização das Atribuições",
                        data: response.data.registro[0],
                        disabled: true,
                        funcionario: funcionarios.data.registro,
                        tarefa: tarefas.data.registro,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlFuncionarioTarefa|viewFuncionariosTarefas] ID de funcionário/tarefa não localizado!");
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlFuncionarioTarefa|viewFuncionariosTarefas] Funcionário/Tarefa não localizado!" });
            console.log("[ctlFuncionarioTarefa.js|viewFuncionariosTarefas] Try Catch: Erro não identificado", erro);
        }
    })();

const updateFuncionarioTarefa = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        try {
            if (req.method == "GET") {
                const id = req.params.id;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getFuncionarioTarefaByID",
                    {
                        id_funcionariotarefa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                if (response.data.status == "ok") {
                    const funcionarios = await axios.get(
                        process.env.servidorBackend + "/GetAllFuncionarios", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}` 
                        }
                    });

                    const tarefas = await axios.get(
                        process.env.servidorBackend + "/GetAllTarefas", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}` 
                        }
                    });

                    response.data.registro[0].dataatribuicao_funcionariotarefa = moment(response.data.registro[0].dataatribuicao_funcionariotarefa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("funcionarios_tarefas/view/vwRUDFuncTarefa.njk", {
                        title: "Atualização de Dados da Atribuição",
                        data: response.data.registro[0],
                        disabled: false,
                        funcionario: funcionarios.data.registro,
                        tarefa: tarefas.data.registro,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlFuncionarioTarefa|updateFuncionarioTarefa] Dados não localizados!");
                }
            } else {
                const regData = req.body;
                const token = req.session.token;

                try {
                    const response = await axios.post(process.env.servidorBackend + "/updateFuncionariosTarefas", regData, {
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
                    console.error('[ctlFuncionarioTarefa.js|updateFuncionarioTarefa] Erro ao atualizar dados da atribuição no servidor backend:', error.message);
                    res.json({
                        status: "Error",
                        msg: error.message,
                        data: response.data,
                        erro: null,
                    });
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlFuncionarioTarefa.js|updateFuncionarioTarefa] Funcionário/Tarefa não localizado!" });
            console.log(
                "[ctlFuncionarioTarefa.js|updateFuncionarioTarefa] Try Catch: Erro não identificado",
                erro
            );
        }

    })();

const deleteFuncionarioTarefa = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.servidorBackend + "/deleteFuncionariosTarefas", regData, {
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
            console.error('[ctlFuncionarioTarefa.js|deleteFuncionarioTarefa] Erro ao deletar dados da atribuição no servidor backend:', error.message);
            res.json({
                status: "Error",
                msg: error.message,
                data: response.data,
                erro: null,
            });
        }
    })();

module.exports = {
    manutFuncionariosTarefas,
    insertFuncionariosTarefas,
    viewFuncionariosTarefas,
    updateFuncionarioTarefa,
    deleteFuncionarioTarefa
};