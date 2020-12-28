# Cesta básica - Backend

## Estrutura

O backend usa um MongoDB instalado num EC2 e AWS Lambdas rodam o backend escrito em Node.

## Banco de dados

É um MongoDB instalado no ec2-user@ec2-100-24-178-38.compute-1.amazonaws.com

## env vars

Você precisa configurar as seguintes env vars:

AWS_PROFILE=cesta-basica-lambda-uploader

As env vars abaixo devem ser configuradas no lambda:

BUCKET_NAME=cesta-basica-sp
PROD_DBURL
DEV_DBURL
ENCRYPTIV
ENCRYPTKEY
GATEWAY_URL=https://nlv04alo2i.execute-api.us-east-1.amazonaws.com/cesta-basica-report-switcher
S3_BUCKET=cesta-basica-sp
SECRET
SLS_DEBUG=*

A env var do DBURL de dev pode ser configurada para o seu mongodb local e a de prod esta configurada no env var do Lambda de prod (cesta-basica-api)

Configurar uma role de acesso do Lambda para o bucket cesta-basica-sp


## Data-load

### Como usar
1. Criar arquivos .csv em /data-to-load
Nesta pasta existem arquivos de exemplos como user-data.csv.example

3. Configure o .env com dados de acesso ao banco de dados

2. `yarn run load-data` com o banco vazio

3. sera criados as coleções com os dados

### Como desenvolver novo tipo de importação

1. Clonar um load-types.js em /src/load-data/load-types

2. Adicionar o export end /src/load-data/load-types/index.js

3. Adicionar chamada em /src/load-data/all.js
