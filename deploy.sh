#!/usr/bin/env sh
set -e
rm -rf build
npm run build
cd build
git init
git checkout -b master
git add -A
git commit -m 'deploy'
git push -f git@github.com:akakaki/akakaki.github.io.git master:gh-pages
cd -