# TinyURL
===
A URL shortify service using Nodejs,Expressjs, Redis, Kafka, Spark, Docker, Docker composite


# How to use it
===
### Deplendency
1.	Docker
2.	Docker-compose

	[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) 
3.	Nginx
4.	Redis
5. 	Node.js/Express.js

### How to run it

```bash
git clone https://github.com/dyf102/TinyURL
cd TinyURL
docker-compose build
docker-compose up
or docker-compose up -d #to start the container in the background
```
## TODO
1.	To build the webpage	
2.	Intergate Kafka and Spark stream to store and analysis the user log

http://spark.apache.org/docs/latest/streaming-kafka-integration.html 

## Reference
[Docker Compose Example](http://anandmanisankar.com/posts/docker-container-nginx-node-redis-example/)
