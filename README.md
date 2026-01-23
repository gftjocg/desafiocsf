# 🧪 API Tests – Postman + Newman + GitHub Actions

Este repositório contém um projeto de **testes automatizados de API** utilizando **Postman**, executado via **Newman** e integrado a uma **pipeline de CI com GitHub Actions**.

O objetivo do projeto é permitir a execução automática dos testes:

* localmente (via Newman)
* automaticamente em *push*, *pull request* ou execução manual no GitHub

---

## 🛠 Tecnologias Utilizadas

* **Postman** – Criação e organização das collections de testes de API
* **Newman** – Executor CLI do Postman
* **Node.js 18** – Ambiente de execução do Newman
* **GitHub Actions** – Pipeline de Integração Contínua (CI)
* **newman-reporter-html** – Geração de relatório HTML
* **YAML** – Configuração do workflow

---

## 📂 Estrutura do Projeto

```text
.
├── postman/
│   ├── collection.json
│   └── environment.json
│
├── .github/
│   └── workflows/
│       └── newman.yml
│
├── README.md
└── desafiocsf.iml
```

---

## 📄 Descrição dos Arquivos

### 📁 `postman/collection.json`

Collection do Postman contendo:

* As requisições de API
* Scripts de testes (`Tests`)
* Validações de status e regras de negócio

Essa collection é executada tanto localmente quanto na pipeline.

---

### 📁 `postman/environment.json`

Arquivo de *environment* do Postman.

Contém **apenas as chaves das variáveis**, sem valores sensíveis, por exemplo:

* `base_url`
* `jwt_token`

Os valores são injetados **em tempo de execução** pelo Newman ou pela pipeline.

---

### 📁 `.github/workflows/newman.yml`

Workflow do **GitHub Actions** responsável por:

* Executar os testes automaticamente em:

    * `push` na branch `master`
    * `pull request`
    * execução manual (`workflow_dispatch`)
* Instalar Node.js e Newman
* Executar a collection do Postman
* Gerar relatório HTML
* Publicar o relatório como *artifact*

#### 🔧 Parâmetro configurável

O workflow aceita o parâmetro:

* **`delay_request`** – Delay (em milissegundos) entre as requisições da collection

Exemplo:

* `400` → 400 ms entre cada request

Esse parâmetro pode ser informado manualmente ao executar o workflow.

---


## 🔧 Variáveis de Ambiente (Postman)

O arquivo `postman/environment.json` contém as **variáveis necessárias para a execução da collection**.

⚠️ **Importante:** por boas práticas de segurança, esse arquivo **não contém valores sensíveis**, apenas as chaves das variáveis. Os valores são injetados em tempo de execução (localmente ou pela pipeline).

### Variáveis utilizadas

| Variável        | Descrição                                     | Obrigatória           | Como é definida                                                            |
|-----------------|-----------------------------------------------|-----------------------|----------------------------------------------------------------------------|
| `base_url`      | URL base da API que será testada              | ✅ Sim                | Via Newman (`--env-var`) ou diretamente no environment para execução local |
| `jwt_token`     | Token de autenticação da API                  | ⚠️ Depende do cenário | Gerado automaticamente pela collection ou injetado via variável            |
| `user_login`    | Usuário para efetuar Login                    | ✅ Sim                | Via Newman (`--env-var`) ou diretamente no environment para execução local |
| `pwd_login`     | Password para efetuar Login                   | ✅ Sim                | Via Newman (`--env-var`) ou diretamente no environment para execução local |
| `user_id`       | ID do usuário cadastrado                      | ❌ Não                | Gerado automaticamente pela collection                                     |
| `user_email`    | Email a ser cadastrado no sistema             | ✅ Sim                | Via Newman (`--env-var`) ou diretamente no environment para execução local |
| `user_password` | Password do email a ser cadastrado no sistema | ✅ Sim                | Via Newman (`--env-var`) ou diretamente no environment para execução local |

### Exemplo de uso no Postman

Dentro da collection, as variáveis são utilizadas da seguinte forma:

```text
{{base_url}}/usuarios
```

Ou em headers:

```text
Authorization: Bearer {{jwt_token}}
```

### Execução local (opção 1 – preenchendo o environment)

Para execução local simples, você pode editar o arquivo `environment.json` e preencher manualmente os valores:

```json
{
  "key": "base_url",
  "value": "https://serverest.dev"
}
```

⚠️ **Não versionar tokens ou dados sensíveis.**

### Execução local / pipeline (opção 2 – recomendada)

Utilize o Newman para injetar os valores dinamicamente:

```bash
newman run postman/collection.json \
  -e postman/environment.json \
  --env-var "base_url=https://serverest.dev"
```

Essa abordagem é a mesma utilizada na **pipeline do GitHub Actions**.

---

## ▶️ Executando Localmente

### 1️⃣ Pré-requisitos

* Node.js 18+
* Instalação do Newman

```bash
npm install -g newman newman
npm install -g newman newman-reporter-html
```

---

### 2️⃣ Executar a collection

```bash
newman run postman/collection.json \
  -e postman/environment.json \
  --delay-request 400 \
  -r html --reporter-html-export report.html
```

---

## 🚀 Executando no GitHub Actions

### Execução automática

A pipeline roda automaticamente quando:

* há `push` na branch `master`
* há `pull request` para `master`

Nesse caso, o delay padrão é **400 ms**.

---

### Execução manual

1. Acesse a aba **Actions** do repositório
2. Selecione o workflow **API Tests – Postman**
3. Clique em **Run workflow**
4. Informe o valor desejado para `delay_request`
5. Execute

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

**Testes executados:**

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

---

## 📊 Relatório de Testes

* O relatório é gerado no formato **HTML**
* Após a execução do workflow, ele fica disponível como **artifact**

### Para baixar:

1. Abra a execução do workflow
2. Role até **Artifacts**
3. Faça o download do arquivo `report.html`

---

## 🔐 Boas Práticas de Segurança

* Tokens e dados sensíveis **não devem** ser versionados
* Utilize:

    * `GitHub Secrets` para credenciais
    * `--env-var` no Newman para injeção dinâmica

---

## 📌 Observações Finais

* O projeto está preparado para fácil expansão

* Pipeline simples, legível e profissional

---

✍️ *Projeto de testes automatizados de API utilizando boas práticas de CI/CD.*
