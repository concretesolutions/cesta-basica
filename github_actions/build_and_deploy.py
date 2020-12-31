#!/usr/bin/env python3

# We use python3 explicitly as this is the default for Ubuntu

"""
This script generates the frontend build package to be deploy onto S3 static buckets.
"""
import subprocess
import sys
from pathlib import Path

ENVS_API_ENDPOINT = {
    'develop': 'REACT_APP_API_HOST_DEV',
    'master': 'REACT_APP_API_HOST_MASTER'
}


def _path_exists_and_branch_is_correct(path, branch):
    result = path.exists() and branch in ENVS_API_ENDPOINT

    if not result:
        error_message = f"""Invalid path to index.js or branch differs from develop/master:
- indexpath is {path}, exists:{path.exists()}
- branch is {branch}"""
        raise RuntimeError(error_message)

    return result


def replace_api_endpoint(index_path, branch):
    if _path_exists_and_branch_is_correct(index_path, branch):
        contents = open(str(index_path)).read()

        contents = contents.replace('REACT_APP_APIHOST', ENVS_API_ENDPOINT[branch])

        with open(str(index_path), 'w') as f:
            f.write(contents)


def build_frontend():
    subprocess.check_call('npm run build'.split(), cwd='frontend')


def install_frontend_dependencies():
    subprocess.check_call('npm i'.split(), cwd='frontend')


def s3_frontend_deploy(branch):
    s3_buckets = {
        'develop': 'cesta-basica-static-dev-12365752',
        'master': 'cesta-basica-static-123567123'
    }

    if branch in s3_buckets:
        command = f'aws s3 sync ./frontend/build/ s3://{s3_buckets[branch]}'.split()
        subprocess.check_call(command)


def build_backend_zip(branch):
    subprocess.check_call(f'/usr/bin/zip -r cesta-basica-api-{branch}.zip .'.split(), cwd='backend')


def lambda_backend_deploy(branch):
    lambda_names = {
        'develop': 'cesta-basica-api-dev',
        'master': 'cesta-basica-api'
    }

    if branch in lambda_names:
        command = f'aws lambda update-function-code --region=us-east-1 --function-name {lambda_names[branch]} --zip' \
                  f'-file fileb://cesta-basica-api-{branch}.zip'
        subprocess.check_call(command.split(), cwd='backend')


if __name__ == '__main__':
    branch = sys.argv[1]

    if not branch:
        raise RuntimeError('Missing branch name.')

    index_path = (Path('./frontend/src/services/API/index.js')).resolve()

    install_frontend_dependencies()
    replace_api_endpoint(index_path, branch)
    build_frontend()
    s3_frontend_deploy(branch)
    build_backend_zip(branch)
    lambda_backend_deploy(branch)
