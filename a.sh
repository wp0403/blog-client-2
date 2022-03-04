#!/bin/bash

cd /www/wwwroot/

rm -r ./wp-boke-client

giteeUrl="https://gitee.com/wang-peng-0403/wp-boke-client.git"

git clone $giteeUrl

cd ./wp-boke-client

npm run build

cd ../

rm -r ./dist

mv ./wp-boke-client/dist ../

echo "Hello World !"