# Using lightweight alpine image
FROM python:3.12-alpine

# Installing packages
RUN apk update
RUN apk add --no-cache gcc g++
RUN pip install --no-cache-dir pipenv

WORKDIR /usr/src/app
COPY Pipfile Pipfile.lock bootstrap.sh ./

# Install API dependencies
RUN pipenv install --system --deploy

# Copy the code
COPY src ./src

# Start app
EXPOSE 5000
ENTRYPOINT ["/usr/src/app/bootstrap.sh"]
