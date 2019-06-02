#! /bin/bash
PWD=`pwd`
echo "working in $PWD"
echo "removing previous build"
cd backend
rm -rf ./static/*

echo "install backend depenency"
npm install 

echo "install frontend depenency"
cd ../frontend
 
npm install
echo "building frontend spa"
quasar build
echo "copying to static directory"
cp -r ./dist/spa/* ../backend/static

echo "starting application"
cd ../backend
docker-compose -f docker-compose.debug.yml up --build