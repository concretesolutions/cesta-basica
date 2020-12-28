#!/usr/bin/env python3

"""
This script deploys the frontend build directory onto S3 buckets, both dev and prod environments.

requirements: aws-cli and IAM credentials.
"""

import subprocess
import sys

branch = sys.argv[1]

S3_BUCKETS = {
    'develop': 'cesta-basica-static-dev-12365752',
    'master': 'cesta-basica-static-123567123'
}

if branch in S3_BUCKETS:
    command = f'aws s3 sync build/ {S3_BUCKETS[branch]}'.split()
    subprocess.check_output(command)


