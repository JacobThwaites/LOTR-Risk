# Lord of the Risk server

Server for the online Lord of the Rings Risk. Written using Python and Django. 

## Setup 

To start the venv: 
```bash
python3 -m venv venv
```
```bash
source venv/bin/activate
```
```bash
pip3 install -r requirements.txt
```


To stop the venv run:
```bash
deactivate
```
docker build -t api .
docker run -d --name lotr-server api

docker-compose build
docker-compose up

## Testing 
Tests are written using the ```unittest``` library.
They can be run locally using:

```bash
python3 run_tests.py
```