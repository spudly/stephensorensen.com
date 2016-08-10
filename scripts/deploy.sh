#!/usr/bin/env bash

if [[ -n $(git status --porcelain) ]]; then
  echo "repo is dirty";
  exit 1;
fi;

npm run build
git checkout -B master
git add -f build
git commit -am "Deploy website"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin master
git checkout -