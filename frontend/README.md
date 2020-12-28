# cesta-basica frontend

This is a ReactJS frontend and it connects to an API Gateway/AWS Lambda.

## Requirements

- aws cli

- AWS programatic credentials for cesta-basica-frontend-uploader user.

You need to set up the AWS credentials file with aws_access_key_id and aws_secret_access_key.

## Env vars

export AWS_PROFILE=cesta-basica-frontend-uploader
export REACT_APP_APIHOST=<backend API>

## Deploy

Static content is placed in cesta-basica-static-123567123 S3 bucket.

Run `npm run build` and `npm run deploy`
