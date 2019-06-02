# Propellerhead Technical Assessment

This is the propellerhead Technical Assessment solution written by Neil Hu. 
The project backend is written in Nodejs (tested in 10.7.0 ) and deployed using Docker. Database is using mysql 5.7 connecting via sequelizejs orm framework. Instead of using normal resultful api, this project is followed GraphQL query framework, so that the apollo-express has been included.

The frontend is build upon [Quasar framework v1.0.0-rc.4](https://quasar.dev/) with vuejs technical stack and apollo-client.

## Project dependencies 
1. Node 
2. [Quasar-Cli](https://quasar.dev/quasar-cli/installation)

... You could install this command line tool using "npm install -g @quasar/cli"

3. Docker

... Using docker-compose to run the whole application. There is also a example .env included in the repository.

To confirm all dependencies is satisfied, please check following command is runing correctly.

+ node --version
+ npm --version
+ quasar info
+ docker-compose version

## How to setup
After all the dependencies are satisfied,  just type "sh execute.sh" and application will build and run. After observed following line printed,
> 🚀 Server ready at http://localhost:4000/graphql

then open browser and typing "localhost:4000/index.html"
