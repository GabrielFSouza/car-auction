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



Configure o banco de dados no appsettings.json
"DefaultConnection": "Host=localhost;Database=yourdatabase;Username=youruser;Password=yourpassword"

Verifique a pasta Migrations e exclua o arquivo ..._InitialCreate.cs e o AppDbContextModelSnapshot.cs

Abra o Console do Gerenciador de Pacotes e execute os seguintes comandos:
> dotnet ef migrations add InitialCreate
> dotnet ef database update

Sugestão: Deixei um pasta com nome de ArquivoJSON com um arquivo **estudande.json**, para assim que
executar o projeto no swagger ir no estudante e executar o POST.

```

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
