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

S3_BUCKETS = {
    'develop': 'cesta-basica-static-dev-12365752',
    'master': 'cesta-basica-static-123567123'
}


def _path_exists_and_branch_is_correct(path, branch):
    return path.exists() and branch in ENVS_API_ENDPOINT


branch = sys.argv[1]
index_path = Path('../frontend/src/services/API/index.js')


def replace_api_endpoint():
    if _path_exists_and_branch_is_correct(index_path, branch):
        contents = open(str(index_path)).read()

        contents = contents.replace('REACT_APP_APIHOST', ENVS_API_ENDPOINT[branch])

        with open(str(index_path), 'w') as f:
            f.write(contents)


def build_frontend():
    subprocess.check_call('cd frontend && npm run build'.split())


def install_frontend_dependencies():
    subprocess.check_call('cd frontend && npm i'.split())


def s3_deploy():
    if branch in S3_BUCKETS:
        command = f'aws s3 sync ./frontend/build/ s3://{S3_BUCKETS[branch]}'.split()
        subprocess.check_output(command)


if __name__ == '__main__':
    install_frontend_dependencies()
    replace_api_endpoint()
    build_frontend()
    s3_deploy()
