up:
	docker-compose up
rebuild:
	docker build --no-cache -t diamond-cars .
delete:
	docker rm $(docker ps -a -q)o