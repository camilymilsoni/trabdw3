const express = require("express");
const routerApp = express.Router();

const appEmpresas = require("../apps/empresas/controller/ctlEmpresa");
const appFuncionarios = require("../apps/funcionarios/controller/ctlFuncionario");
const appTarefas = require("../apps/tarefas/controller/ctlTarefa");
const appFuncionariosTarefas = require("../apps/funcionarios_tarefas/controller/ctlFuncionarioTarefa");
const appLogin = require("../apps/login/controller/ctlLogin");

routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Empresa
routerApp.get("/GetAllEmpresas", appLogin.AutenticaJWT, appEmpresas.GetAllEmpresas);
routerApp.post("/GetEmpresaByID", appLogin.AutenticaJWT, appEmpresas.GetEmpresaByID);
routerApp.post("/InsertEmpresas", appLogin.AutenticaJWT, appEmpresas.InsertEmpresas);
routerApp.post("/UpdateEmpresas", appLogin.AutenticaJWT, appEmpresas.UpdateEmpresas);
routerApp.post("/DeleteEmpresas", appLogin.AutenticaJWT, appEmpresas.DeleteEmpresas);

//Funcionário
routerApp.get("/GetAllFuncionarios", appLogin.AutenticaJWT, appFuncionarios.GetAllFuncionarios);
routerApp.post("/GetFuncionarioByID", appLogin.AutenticaJWT, appFuncionarios.GetFuncionarioByID);
routerApp.post("/InsertFuncionarios", appLogin.AutenticaJWT, appFuncionarios.InsertFuncionarios);
routerApp.post("/UpdateFuncionarios", appLogin.AutenticaJWT, appFuncionarios.UpdateFuncionarios);
routerApp.post("/DeleteFuncionarios", appLogin.AutenticaJWT, appFuncionarios.DeleteFuncionarios);

//Tarefa
routerApp.get("/GetAllTarefas", appLogin.AutenticaJWT, appTarefas.GetAllTarefas);
routerApp.post("/GetTarefaByID", appLogin.AutenticaJWT, appTarefas.GetTarefaByID);
routerApp.post("/InsertTarefas", appLogin.AutenticaJWT, appTarefas.InsertTarefas);
routerApp.post("/UpdateTarefas", appLogin.AutenticaJWT, appTarefas.UpdateTarefas);
routerApp.post("/DeleteTarefas", appLogin.AutenticaJWT, appTarefas.DeleteTarefas);

//Funcionário Tarefa
routerApp.get("/GetAllFuncionariosTarefas", appLogin.AutenticaJWT, appFuncionariosTarefas.GetAllFuncionariosTarefas);
routerApp.post("/GetFuncionarioTarefaByID", appLogin.AutenticaJWT, appFuncionariosTarefas.GetFuncionarioTarefaByID);
routerApp.post("/InsertFuncionariosTarefas", appLogin.AutenticaJWT, appFuncionariosTarefas.InsertFuncionariosTarefas);
routerApp.post("/UpdateFuncionariosTarefas", appLogin.AutenticaJWT, appFuncionariosTarefas.UpdateFuncionariosTarefas);
routerApp.post("/DeleteFuncionariosTarefas", appLogin.AutenticaJWT, appFuncionariosTarefas.DeleteFuncionariosTarefas);

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;