# Data-load

## Como usar
1. Criar arquivos .csv em /data-to-load
Nesta pasta existem arquivos de exemplos como user-data.csv.example

3. Configure o .env com dados de acesso ao banco de dados

2. `yarn run load-data` com o banco vazio

3. sera criados as coleções com os dados

## Como desenvolver novo tipo de importação

1. Clonar um load-types.js em /src/load-data/load-types

2. Adicionar o export end /src/load-data/load-types/index.js

3. Adicionar chamada em /src/load-data/all.js

