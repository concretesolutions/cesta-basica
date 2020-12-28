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
