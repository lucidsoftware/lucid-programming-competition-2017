#!/usr/bin/env python2
import argparse
import os.path
import sys
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument('--input', nargs='*')
parser.add_argument('--output', nargs='*')
args = parser.parse_args()

with zipfile.ZipFile(sys.stdout, 'w', zipfile.ZIP_DEFLATED) as output:
    for path in args.input:
        base = os.path.basename(path)
        base, _ = os.path.splitext(base)
        output.write(path, 'input/input{:02d}.txt'.format(int(base)))
    for path in args.output:
        base = os.path.basename(path)
        base, _ = os.path.splitext(base)
        output.write(path, 'output/output{:02d}.txt'.format(int(base)))
