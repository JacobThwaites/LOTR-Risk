FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV PYTHONPATH="/app:${PYTHONPATH}"

WORKDIR /app

COPY . /app

COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r /app/requirements.txt

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]