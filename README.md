<h1 align="center">:file_cabinet:README.md</h1>

## :memo: Descrição
Este projeto implementa uma API para gerenciar uma plataforma de leilão de carros. O sistema permite que carros sejam cadastrados para leilões, que usuários façam lances nos carros disponíveis e que um vencedor seja determinado quando o leilão for encerrado. A API é construída utilizando tecnologias modernas para garantir escalabilidade, segurança e manutenibilidade.

## :books: Funcionalidades
* <b>Funcionalidades</b>: API com endpoints para realizar operações CRUD
(Create, Read, Update, Delete) para os recursos de Curso, Estudante e
Avaliação.

## :wrench: Tecnologias utilizadas
* Docker Compose
* MongoDB
* Node
* Express
* JWT (JSON Web Token)
* Zod
* Vitest
* GitHub Actions
* Typescript

## :rocket: Rodando o projeto
Para rodar o projeto é necessário executar os seguintes passos:
```

Instalar o NodeJS: https://nodejs.org/pt
Instalar o Docker: https://www.docker.com/products/docker-desktop/

Clone o repositório
> git clone https://github.com/GabrielFSouza/car-auction.git
> cd car-auction

```

## :Instalar as dependências
```
> pnpm i
```

## :Ajustar o ambiente do sistema

Variáveis de Ambiente no .env.example: 

Variáveis Preenchidas:

Ambiente (NODE_ENV ou similar): Define o ambiente em que a aplicação está rodando, como development, production, ou test.
Porta (PORT ou similar): A porta na qual a aplicação irá escutar. Por exemplo, 3000 para aplicações web.
Host (HOST ou similar): O endereço do servidor ou localhost onde a aplicação está rodando.
Collections do MongoDB (MONGO_DB_NAME, MONGO_COLLECTIONS, etc.): Nome do banco de dados e coleções no MongoDB que a aplicação irá utilizar.
Variáveis a Serem Preenchidas:

Credenciais de Banco de Dados:
MONGO_URI: URL de conexão com o MongoDB, incluindo o nome do banco de dados e credenciais, se necessário. Exemplo: mongodb://username:password@host:port/database.
Segurança e Autenticação:
JWT_SECRET: Segredo para assinar tokens JWT.
SESSION_SECRET: Segredo para gerenciar sessões.
Configurações Específicas:
API_KEY: Para integrar com serviços externos, se aplicável.
EMAIL_SERVICE_KEY: Se sua aplicação enviar e-mails, pode precisar de uma chave para o serviço de e-mail.

Regras para Imagem Docker:

Formato das Variáveis: As variáveis devem ser definidas no formato KEY=value no arquivo .env. Exemplo: PORT=3000.
Separação por Quebras de Linha: Cada variável deve estar em uma linha separada.
Valores Padrão: Se você não tiver um valor específico, pode usar valores padrão como placeholders. Lembre-se de substituir por valores reais antes de produção.
Segurança: Não inclua informações sensíveis diretamente no arquivo .env se for compartilhar o código. Utilize variáveis de ambiente configuradas no ambiente de produção ou serviços de gerenciamento de segredos.

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://gabirudev.com/">
        <img src="https://avatars.githubusercontent.com/u/58001372?s=400&u=1915bb67b262dd94bb5354425e8f2deba07098e5&v=4" width="100px;" alt="Foto de Gabriel no GitHub"/><br>
        <sub>
          <b>gabirudev</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
