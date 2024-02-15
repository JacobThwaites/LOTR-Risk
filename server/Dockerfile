# Use the official Python 3.9 image as a base
FROM python:3.9.12-slim

# Set environment variables (adjust as needed)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV PYTHONPATH="/app:${PYTHONPATH}"

# Create a working directory
WORKDIR /app

# Copy your Django project into the container
COPY . /app

# Install Python dependencies
COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Expose ports if needed
EXPOSE 8000

# Set the command to run your Django development server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]