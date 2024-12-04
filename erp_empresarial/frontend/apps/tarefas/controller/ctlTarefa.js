const axios = require("axios");
const moment = require("moment");

const manutTarefas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        const resp = await axios.get(process.env.servidorBackend + "/getAllTarefas", {
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
            res.render("tarefas/view/vwManutTarefa.njk", {
                title: "Manutenção de Tarefas",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        });

        if (!resp) {
            return;
        }

        res.render("tarefas/view/vwManutTarefa.njk", {
            title: "Manutenção de Tarefas",
            data: resp.data.registro,
            erro: null,
            userName: userName,
        });
    })();

const insertTarefas = async (req, res) =>
    (async () => {
        if (req.method == "GET") {
            return res.render("tarefas/view/vwCrTarefa.njk", {
                title: "Cadastro de Tarefa",
                data: null,
                erro: null,
                userName: null,
            });
        } else {
            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.servidorBackend + "/insertTarefas", regData, {
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

const viewTarefas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        try {
            if (req.method == "GET") {
                const id = req.params.id;
                oper = req.params.oper;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getTarefaByID",
                    {
                        id_tarefa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].datacriacao_tarefa = moment(response.data.registro[0].datacriacao_tarefa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("tarefas/view/vwRUDTarefa.njk", {
                        title: "Visualização da Tarefa",
                        data: response.data.registro[0],
                        disabled: true,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlTarefa|viewTarefas] ID de tarefa não localizado!");
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlTarefa|viewTarefas] Tarefa não localizada!" });
            console.log("[ctlTarefa.js|viewTarefas] Try Catch: Erro não identificado", erro);
        }
    })();

const updateTarefa = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        try {
            if (req.method == "GET") {
                const id = req.params.id;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getTarefaByID",
                    {
                        id_tarefa: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].datacriacao_tarefa = moment(response.data.registro[0].datacriacao_tarefa).format(
                        "YYYY-MM-DD"
                    );

                    res.render("tarefas/view/vwRUDTarefa.njk", {
                        title: "Atualização de Dados da Tarefa",
                        data: response.data.registro[0],
                        disabled: false,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlTarefa|updateTarefa] Dados não localizados!");
                }
            } else {
                const regData = req.body;
                const token = req.session.token;

                try {
                    const response = await axios.post(process.env.servidorBackend + "/updateTarefas", regData, {
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
                    console.error('[ctlTarefa.js|updateTarefa] Erro ao atualizar dados da tarefa no servidor backend:', error.message);
                    res.json({
                        status: "Error",
                        msg: error.message,
                        data: response.data,
                        erro: null,
                    });
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlTarefa.js|updateTarefa] Tarefa não localizada!" });
            console.log(
                "[ctlTarefa.js|updateTarefa] Try Catch: Erro não identificado",
                erro
            );
        }

    })();

const deleteTarefa = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.servidorBackend + "/deleteTarefas", regData, {
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
            console.error('[ctlTarefa.js|deleteTarefa] Erro ao deletar dados da tarefa no servidor backend:', error.message);
            res.json({
                status: "Error",
                msg: error.message,
                data: response.data,
                erro: null,
            });
        }
    })();

module.exports = {
    manutTarefas,
    insertTarefas,
    viewTarefas,
    updateTarefa,
    deleteTarefa
};