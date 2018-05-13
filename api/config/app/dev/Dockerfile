FROM python:3
LABEL maintainer="RyanLafferty"

# Create app directory
RUN mkdir /app
WORKDIR /app

# Add requirements to app directory
ADD requirements.txt /app/

# Add application to the container
ADD app /app/
ADD app/manage.py /app/

# Install requirements
RUN pip install -r requirements.txt

# Start application
EXPOSE 8080
ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8080"]