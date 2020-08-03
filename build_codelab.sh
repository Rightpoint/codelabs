#!/bin/bash

files=""
for filename in _codelabs/*.md
do
    files+=$filename
    files+=" "
done

echo $files
claat export $files &
wait

for src in **/codelab.json
do
    dir=${src%"/codelab.json"}
    dest=${src/codelab/"$dir.11tydata"}
    cp $src $dest
done
