#!/bin/bash

claat export "_codelabs/$1.md"
cd $1
cp codelab.json "$1.11tydata.json"
