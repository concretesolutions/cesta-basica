# cesta-basica

## Descrição da infra:

Usamos a conta da Concrete por falta de tempo(hoje 2020-03-24).O contato é a Natália Gimenez, gerente de devOps.

Temos:

- o front que é armazenado no S3 estatico bucket cesta-basica-sp-estaticos.

- backend no lambda

- a configuração da API é feita pelo serverless framework usando o arquivo serverless.yml.

- Banco de dados: AWS DocumentDB que funciona como o mongodb.


## Configuração

Crie o dir:

`mkdir ~/.aws`

Copie o arquivo credentials que está no slack, canal #covid-cesta-basica-devs nesse dir.


## deploy no S3 do frontenv

Atualize os pacotes de npm:

`npm i`

Para enviar p/ o S3 bucket:

`npm run build`

`npm run deploy-dev`



## Configuração no AWS console, AWS Policy para o frontend no S3

Procure por S3 no aws console, clique no bucket cesta-basica-sp-estaticos.


Colocar se seguinte policy na aba "permissions" do bucket cesta-basica-sp-estaticos.

`{
  "Version": "2008-10-17",
    "Id": "cesta-basica-frontend-public-policy",
    "Statement": [
        {
      "Sid": "Statement-cesta-basica-sp-esticos-1",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::cesta-basica-sp-estaticos/*",
      "Principal": {
        "AWS": [
          "*"
        ]
      }
    },
    {
      "Sid": "Statement-cesta-basica-sp-esticos-2",
      "Action": [
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::cesta-basica-sp-estaticos",
      "Principal": {
        "AWS": [
          "*"
        ]
      }
    }
    ]
  }`

Essa policy libera acesso público.
