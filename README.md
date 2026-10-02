# Web Developer Technical Challenge

## Customer Service Request Portal

# Como executar a aplicação

Siga os passos abaixo para configurar o projeto e executar a aplicação localmente.

## 1. Clonar o projeto

Primeiro, faça o clone do repositório:

```bash
git clone https://github.com/AzafoCossa/web-dev-sdo-challenge
```

Entre na pasta do projeto:

```bash
cd web-dev-sdo-challenge
```

## 2. Instalar as dependências

Com o projeto clonado, instale todas as dependências necessárias utilizando o **npm**:

```bash
npm install
```

> **Nota:** O comando correto é `npm install`.

## 3. Configurar as variáveis de ambiente

O projeto disponibiliza um arquivo `.env.example` com as variáveis de ambiente necessárias.

Crie o arquivo `.env` a partir do `.env.example`:

```bash
cp .env.example .env
```

Depois, abra o arquivo `.env` e configure os valores de acordo com o seu ambiente:

```bash
# Exemplo
VITE_APP_ENV=local

VITE_API_BASE_URL=http://localhost:1080

VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_CLIENT_ID=<seu-client-id>
VITE_KEYCLOAK_REALM=<seu-keycloak-realm>
```

> **Importante:** Não compartilhe ou faça commit do arquivo `.env`, pois ele pode conter informações sensíveis.

## 4. Iniciar o servidor Keycloak

Antes de iniciar a aplicação, é necessário garantir que o servidor **Keycloak** esteja em execução.

Inicie o Keycloak utilizando a configuração correspondente ao seu ambiente.

Por exemplo, caso esteja utilizando o Keycloak localmente:

```bash
# Comando de exemplo
./kc.sh start-dev #No Linux/Mac OS
./kc.bat start-dev #No windows
```

Certifique-se de que o Keycloak esteja acessível através da URL configurada no arquivo `.env`.

## 5. Executar a aplicação

Após instalar as dependências, configurar o `.env` e iniciar o Keycloak, execute a aplicação:

```bash
npm run dev
```

A aplicação estará disponível no endereço indicado no terminal, normalmente:

```text
http://localhost:5173
```
