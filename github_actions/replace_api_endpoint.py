#!/usr/bin/env python3

import sys
from pathlib import Path

ENVS = {
    'develop': 'REACT_APP_API_HOST_DEV',
    'master': 'REACT_APP_API_HOST_MASTER'
}


def _path_exists_and_branch_is_correct(path, branch):
    return path.exists() and branch in ENVS


branch = sys.argv[1]
index_path = Path('../frontend/src/services/API/index.js')

if _path_exists_and_branch_is_correct(index_path, branch):
    contents = open(str(index_path)).read()

    contents = contents.replace('REACT_APP_APIHOST', ENVS[branch])

    with open(str(index_path), 'w') as f:
        f.write(contents)
