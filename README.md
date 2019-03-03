# iforum
Internet forum API
Prerequisite: Docker for windows/mac/linux

1) Clone the iforum folder.
2) Install/fetch docker mongodb and rabbitmq images.
3) Configure mongo db container with username/password and expose port e.g port 27017
4) Configure rabbit mq container -  port number
5) Run docker build at iforum's root.
6) Run the container by setting environment variable: -
    docker run -e iforum_jwtPrivateKey=supersecretkey iforum-api
7) In server.js file add the mongodb credentails i.e your mongodbs container with ip, port number, username/password.
   Also, add the rabbitmq container's ip and port number.
8) Once all the containers are running then APIs can be checked via postman:
   http://localhost:3000/iforum/api/register

