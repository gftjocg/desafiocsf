# 🧪 API Tests – Postman + Newman + Allure + GitHub Actions

Este repositório contém um projeto de **testes automatizados de API** utilizando **Postman**, executado via **Newman**, com geração de **relatórios HTML (htmlextra)** e **Allure**, totalmente integrado a uma **pipeline de CI/CD no GitHub Actions**.

Os testes podem ser executados:

* localmente (execução manual via Node.js)
* automaticamente via GitHub Actions (push, pull request ou execução manual)

---

## 🛠 Tecnologias Utilizadas

* **Postman** – Criação e manutenção das collections de testes
* **Newman** – Executor CLI do Postman
* **Node.js 20** – Ambiente de execução
* **TypeScript** – Tipagem e organização do código
* **Allure Report** – Relatórios avançados de testes
* **GitHub Actions** – Pipeline de CI/CD
* **YAML** – Configuração do workflow

---

## 📂 Estrutura do Projeto

```text
.
├── .github/
│   └── workflows/
│       └── api-tests.yml
│
├── config/
│   └── allure.conf.ts
│   └── test.conf.ts
│
├── helpers/
│   ├── constants.ts
│   └── interfaces/
│       └── postman.interfaces.ts
│       └── test.interfaces.ts
│
├── postman/
│   ├── collection.json
│   └── environment.json
│
├── tests/
│   ├── test.api.ts
│   ├── test.report.ts
│   ├── allure.generate.ts
│   └── allure.open.ts
│
├── reports/
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Dependências do Projeto

### Dependências de desenvolvimento

```json
{
  "typescript": "^5.9.3",
  "ts-node": "^10.9.2",
  "@types/node": "^25.0.10",
  "newman": "^6.2.2",
  "newman-reporter-htmlextra": "^1.23.1",
  "newman-reporter-allure": "^3.4.5",
  "allure-commandline": "^2.36.0"
}
```

---

## 🔧 Variáveis de Ambiente

As variáveis abaixo são utilizadas tanto na **execução local** quanto na **pipeline do GitHub Actions**.

| Variável              | Obrigatório | Descrição                         |
| --------------------- |-------------| --------------------------------- |
| `BASE_URL`            | ✅ Sim      | URL base da API                   |
| `USER_LOGIN`          | ✅ Sim      | Usuário para login                |
| `PWD_LOGIN`           | ✅ Sim      | Senha do usuário                  |
| `USER_NAME`           | ✅ Sim      | Nome do usuário                   |
| `USER_EMAIL`          | ✅ Sim      | Email do usuário                  |
| `USER_PASSWORD`       | ✅ Sim      | Senha do usuário                  |
| `DELAY_REQUEST`       | ✅ Sim      | Delay entre requisições (ms)      |

> ⚠️ **Boas práticas:** nunca versione dados sensíveis. Use variáveis de ambiente ou GitHub Secrets.

---

## ▶️ Execução Manual (Local)

### ⚠️ Atenção sobre o arquivo `environment.json`

Para execução **manual/local**, é necessário **alterar diretamente o arquivo**:

```text
postman/environment.json
```

Nesse arquivo devem ser configurados os valores das variáveis utilizadas nos testes (ex: `user_login`, `pwd_login`, `user_name`, `user_email` e `user_password`.).

> 🔒 **IMPORTANTE:**
>
> * Sempre faça um **backup** do arquivo `environment.json` antes de alterá-lo.
> * Recomenda-se manter uma cópia como `environment.backup.json`.
> * No uso via **pipeline**, esse arquivo **não é alterado**, pois as variáveis são sobrescritas dinamicamente.

---

### 1️⃣ Pré-requisitos

* Node.js **20+**
* Java (necessário para o Allure)

---

### 2️⃣ Instalar dependências

```bash
npm ci
```
---
### 3️⃣ Alterar os values do arquivo `environments.json`

```bash
user_login
pwd_login
user_name
user_email
user_password
```

---

### 4️⃣ Executar os testes

```bash
npm run test:report
```

---

### 5️⃣ Gerar e abrir relatório Allure

```bash
npm run allure:generate
npm run allure:open
```

---


## 🤖 Execução via GitHub Actions (Pipeline)

### ⚠️ Atenção sobre variáveis de ambiente no workflow

Para execução via **GitHub Actions**, as variáveis de ambiente **devem ser configuradas diretamente no arquivo**:

```text
.github/workflows/api-tests.yml
```

Nesse arquivo estão definidas as variáveis utilizadas durante a execução da pipeline, responsáveis por sobrescrever dinamicamente os valores do `environment.json` do Postman.

> 🔒 **IMPORTANTE:**
>
> * Sempre revise e ajuste as variáveis de ambiente no `api-tests.yml` antes de executar a pipeline.
> * Em projetos reais, recomenda-se fortemente utilizar **GitHub Secrets** para dados sensíveis.
> * Alterações no workflow impactam todas as execuções automáticas.

---

### Eventos que disparam a pipeline

* `push` na branch `main`
* `pull_request` para `main`
* execução manual (`workflow_dispatch`)

### ▶️ Execução manual pelo GitHub

1. Acesse a aba **Actions** do repositório
2. Selecione **API Tests - Postman + Newman + Allure**
3. Clique em **Run workflow**
4. Informe o valor de `delay_request` (opcional)
5. Execute

---
## 🔐 Variáveis de Ambiente no Workflow

Exemplo extraído do workflow:

```yaml
env:
  DELAY_REQUEST: ${{ github.event.inputs.delay_request }}
  BASE_URL: "https://serverest.dev"
  USER_LOGIN: "fulano@qa.com"
  PWD_LOGIN: "teste"
  USER_NAME: "Teste API"
  USER_EMAIL: "teste@qa.com"
  USER_PASSWORD: "teste"
```

Essas variáveis são injetadas dinamicamente e utilizadas para sobrescrever o `environment.json` do Postman.

---

## 🧪 Descrição dos Testes da Collection

A collection **Desafio Automação API** está organizada em dois grupos principais: **Login** e **Usuários**. Cada request possui validações automáticas para garantir o correto funcionamento da API.

---

### 🔐 Login → `POST /login`

**Objetivo:**
Realizar autenticação do usuário e obter o token JWT para as demais requisições.

**Pré-requisitos (Pre-request):**

* Valida se as variáveis obrigatórias estão definidas:
  * `base_url`
  * `user_login`
  * `pwd_login`
* Testes executados**


* ✔️ Valida status HTTP **200** (login realizado com sucesso)
* ✔️ Garante que o response body não está vazio
* ✔️ Valida a existência do token JWT no retorno
* ✔️ Salva o token retornado na variável de ambiente `jwt_token`

---

### 👥 Usuários → `GET /usuarios`

**Objetivo:**
Listar todos os usuários cadastrados na API.

**Pré-requisitos:**

* Verifica se a variável `base_url` está definida
* Utiliza autenticação **Bearer Token** (`jwt_token`)

**Testes executados:**

* ✔️ Valida status HTTP **200**
* ✔️ Valida que o retorno está no formato **JSON**

---

### 👤 Criar Usuário → `POST /usuarios`

**Objetivo:**
Criar um novo usuário no sistema.

**Pré-requisitos:**

* Valida se as variáveis obrigatórias estão definidas:
  * `base_url`
  * `user_name`
  * `user_email`
  * `user_password`
* Autenticação via **Bearer Token**

**Testes executados:**

* ✔️ Valida status HTTP **201** (usuário criado com sucesso)
* ✔️ Valida que o retorno está no formato **JSON**
* ✔️ Garante que o response body não está vazio
* ✔️ Valida a existência do campo `_id` do usuário
* ✔️ Salva o `_id` do usuário criado na variável `user_id`

---

### 🔍 Consultar Usuário por ID → `GET /usuarios/{id}`

**Objetivo:**
Consultar os dados de um usuário específico.

**Pré-requisitos:**

* Valida se as variáveis obrigatórias estão definidas:

  * `base_url`
  * `user_id`
* Autenticação via **Bearer Token**

**Testes executados:**

* ✔️ Valida status HTTP **200**
* ✔️ Valida que o retorno está no formato **JSON**
* ✔️ Garante que o response body não está vazio

---

### ✏️ Editar Usuário → `PUT /usuarios/{id}`

**Objetivo:**
Atualizar os dados de um usuário existente.

**Pré-requisitos:**

* Valida se as variáveis obrigatórias estão definidas:

  * `base_url`
  * `user_id`
  * `user_name`
  * `user_email`
  * `user_password`
* Autenticação via **Bearer Token**

**Testes executados:**

* ✔️ Valida status HTTP **200**
* ✔️ Valida que o retorno está no formato **JSON**
* ✔️ Garante que o response body não está vazio

---

### 🗑️ Excluir Usuário → `DELETE /usuarios/{id}`

**Objetivo:**
Remover um usuário existente do sistema.

**Pré-requisitos:**

* Valida se as variáveis obrigatórias estão definidas:

  * `base_url`
  * `user_id`
* Autenticação via **Bearer Token**

**Testes executados:**

* ✔️ Valida status HTTP **200**
* ✔️ Valida que o retorno está no formato **JSON**
* ✔️ Garante que o response body não está vazio
*
---

## 📊 Relatórios

### Newman HTML

* Gerado automaticamente
* Publicado como **artifact** no GitHub Actions

### Allure Report

* Resultados gerados em `allure-results`
* Relatório publicado via **GitHub Pages**

---

## 📌 Observações Finais

* O projeto segue boas práticas de CI/CD
* As variáveis do Postman são sobrescritas dinamicamente
* Estrutura pronta para escalar novos cenários de teste

---

✍️ *Projeto de automação de testes de API utilizando Postman, Newman, TypeScript e GitHub Actions.*