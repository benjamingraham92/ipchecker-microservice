FROM ubuntu:18.04

RUN apt-get update -y && apt-get install -y python3 python3-pip

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./src /app

EXPOSE 5000

CMD ["python3", "index.py"]
