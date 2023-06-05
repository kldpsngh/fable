#! /bin/bash
docker system prune -f
docker network create --internal=false fable-network
cd database-deployment
docker-compose down
docker-compose up -d
cd ../fable/
npm i --loglevel=verbose
docker build -t fable:latest .
cd ../service-deployment
docker-compose down
docker-compose up -d