# Projeto Site Educacional - Prof. Ary Vieira Barradas

Este é um projeto web completo e pronto para produção para um site educacional. Ele inclui um frontend em React, um backend em Node.js com Express, um banco de dados PostgreSQL, e é totalmente containerizado com Docker.

## Visão Geral da Arquitetura

O projeto utiliza uma arquitetura de microsserviços containerizados, orquestrados pelo Docker Compose:
- **Frontend**: Um cliente React servido por um servidor Nginx leve.
- **Backend**: Uma API RESTful construída com Node.js e Express para gerenciar cursos, inscrições e o painel administrativo.
- **Database**: Uma instância do PostgreSQL para persistência de dados.

## Stack de Tecnologia

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, JWT, pg (Node-Postgres)
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker & Docker Compose

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados em sua máquina Windows 11:

1.  **Docker Desktop**: Essencial para executar os containers. Faça o download em [docker.com](https://www.docker.com/products/docker-desktop/).
    * Durante a instalação, certifique-se de que a opção **WSL 2 (Windows Subsystem for Linux 2)** esteja habilitada, pois oferece melhor performance.
2.  **Git** (Opcional, mas recomendado): Para clonar o projeto. Baixe em [git-scm.com](https://git-scm.com/).
3.  **Visual Studio Code** (Recomendado): Um editor de código com excelente suporte a Docker e JavaScript. Baixe em [code.visualstudio.com](https://code.visualstudio.com/).

## Estrutura de Arquivos

```
/professor-ary-site/
|-- backend/
|   |-- src/
|   |-- .dockerignore
|   |-- Dockerfile
|   `-- package.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- .dockerignore
|   |-- Dockerfile
|   `-- package.json
|-- .gitignore
|-- docker-compose.yml
`-- README.md
```

## Guia de Instalação e Execução (Passo a Passo)

### Passo 1: Obtenha os Arquivos do Projeto

Crie uma pasta principal para o projeto, por exemplo, `professor-ary-site`, e organize todos os arquivos fornecidos nesta documentação de acordo com a estrutura de arquivos acima.

### Passo 2: Configure as Variáveis de Ambiente do Backend

O backend precisa de credenciais para se conectar ao banco de dados e de um segredo para a autenticação.

1.  Navegue até a pasta `backend/src/`.
2.  Crie um novo arquivo chamado `.env`.
3.  Adicione o seguinte conteúdo ao arquivo `.env`. **Você pode usar esses valores padrão, pois o Docker Compose os usará para configurar o banco de dados automaticamente.**

    ```env
    # Configuração do Banco de Dados PostgreSQL
    DB_USER=professorary
    DB_HOST=db
    DB_DATABASE=sitecursos
    DB_PASSWORD=secretpassword
    DB_PORT=5432

    # Segredo para o JSON Web Token (JWT)
    JWT_SECRET=este-e-um-segredo-muito-seguro-para-jwt
    ```

### Passo 3: Construa e Execute os Containers

Este é o passo principal. O Docker Compose lerá o arquivo `docker-compose.yml` e fará todo o trabalho pesado.

1.  Abra um terminal (PowerShell ou Prompt de Comando) na **raiz do seu projeto** (a pasta `professor-ary-site`).
2.  Execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```
    * `--build`: Força a reconstrução das imagens do Docker, o que é útil na primeira vez ou quando você faz alterações nos `Dockerfiles` ou no código-fonte.
    * O processo pode levar alguns minutos na primeira vez, pois o Docker fará o download das imagens base (Node, Postgres, Nginx) e instalará as dependências do projeto.
    * Você verá logs de todos os três serviços (db, backend, frontend) no seu terminal.

### Passo 4: Acesse o Site e o Painel Administrativo

Após o comando `docker-compose up` ser concluído e os serviços estarem rodando:

-   **Site Público**: Abra seu navegador e acesse `http://localhost:3000`
-   **API do Backend**: A API está disponível em `http://localhost:5000` (o frontend a consome internamente).
-   **Painel Administrativo**: Acesse `http://localhost:3000/admin`

    -   **Usuário**: `admin`
    -   **Senha**: `admin123`

    *(Estas credenciais são inseridas no banco de dados pelo script de inicialização `init.sql` e o hash da senha é gerado no backend na primeira inicialização.)*

### Passo 5: Parando a Aplicação

Para parar todos os containers, pressione `Ctrl + C` no terminal onde o `docker-compose` está rodando. Para removê-los completamente (incluindo redes e volumes anônimos), execute:

```bash
docker-compose down
```

Para remover também o volume do banco de dados (**CUIDADO: ISSO APAGARÁ TODOS OS DADOS**), use:

```bash
docker-compose down -v
```