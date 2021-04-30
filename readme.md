# PUC | TCC Fullstack Development

Esse projeto é o trabalho de conclusão para o curso de Pós Graduação Fullstack Development, PUC MG.
Nele você irá encontrar todos os arquivos referentes à:
- Módulo de Frontend
- Módulo de Backend
- Dump, com os scripts SQL de carga no database
- **Documentação** com todos os diagramas produzidos

O link para o repositório Git é:
https://github.com/ogabrielguerra/puc-tcc

## COMO SUBIR O PROJETO
### BACKEND
O projeto está conteinerizado com Docker, o que significa que pode ser facilmente inicializado localmente.
Para isso, estando no diretório www, basta usar o 'docker-compose up -d':
```
cd www
docker-compose up -d
```
### FRONTEND
Para inicializar o módulo de Frontend, execute:
```
cd frontend/localbusiness
npm start
```