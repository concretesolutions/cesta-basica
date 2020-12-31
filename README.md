# cesta-basica

## Description

That software was built to help people that have been affected by the economic recession caused by the coronavirus.

It manages donations made by organizations and distribution process.

## Requirements

- aws cli

- aws programatic credentials

- npm

- node

## AWS environment

Current AWS account ID is 069300125612.

We have some buckets and lambdas in a AWS Concrete account, we should migrate these into the current account.

## Current state

The website frontend is hosted in a Netlify account, the backend is a  Heroku app and the database is a MongoDB running in an EC2 instance.

## Future state

We plan to host the frontend as a static website on a S3 bucket which connects to an API Gateway/AWS lambda. The database is the same we have today.

Also we plan to create a dev environment.

## Deployment process

Static content is placed in cesta-basica-static-123567123(production)/cesta-basica-static-dev-12365752(development) S3 buckets.

We have two environments deployed on AWS, production and development.

Both environments have static S3 buckets(frontend), API gateway, lambdas (backend) and databases (mongodb) running on EC2 instances.

If you merge you code onto develop/master branches, github actions will deploy merged code.

Github actions uses an IAM user named cesta-basica-github-actions-uploader with programatic credentials. Credentials are saved in Github Secrets settings.

Make sure you rotate these credentials every 3 months as ACP Portal monitors IAM accounts.

 


