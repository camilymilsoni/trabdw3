CREATE DATABASE api_employee;

\c api_employee;

CREATE TABLE IF NOT EXISTS empresa (
    id_empresa BIGSERIAL CONSTRAINT pk_empresa PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    cnpj_empresa VARCHAR(14) UNIQUE NOT NULL,
    datacriacao_empresa DATE,
    receitaanual_empresa NUMERIC(15, 2),
    removido_empresa BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS funcionario (
    id_funcionario BIGSERIAL CONSTRAINT pk_funcionario PRIMARY KEY,
    nome_funcionario VARCHAR(255) NOT NULL,
    salario_funcionario NUMERIC(10, 2),
    cargo_funcionario VARCHAR(100),
    datacontratacao_funcionario DATE,
    removido_funcionario BOOLEAN DEFAULT FALSE,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tarefa (
    id_tarefa BIGSERIAL CONSTRAINT pk_tarefa PRIMARY KEY,
    titulo_tarefa VARCHAR(255) NOT NULL,
    descricao_tarefa TEXT,
    datacriacao_tarefa DATE,
    prioridade_tarefa NUMERIC(2, 1),
    removido_tarefa BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS funcionariotarefa (
    id_funcionariotarefa BIGSERIAL CONSTRAINT pk_functarefa PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_tarefa INT NOT NULL,
    observacao_funcionariotarefa TEXT,
    dataatribuicao_funcionariotarefa DATE,
    horastrabalhadas_funcionariotarefa NUMERIC(5, 2),
    removido_funcionariotarefa BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario) ON DELETE CASCADE,
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id_tarefa) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGSERIAL CONSTRAINT pk_usuarios PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    removido_usuario BOOLEAN DEFAULT FALSE
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios VALUES
    (default, 'admin', crypt('admin', gen_salt('bf')))
ON CONFLICT DO NOTHING;