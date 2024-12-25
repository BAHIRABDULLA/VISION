#!/bin/sh

# Define RabbitMQ hostname and port
RABBITMQ_HOST="rabbitmq"
RABBITMQ_PORT=5672

# Wait for RabbitMQ to be reachable
echo "Waiting for RabbitMQ at $RABBITMQ_HOST:$RABBITMQ_PORT..."
while ! nc -z $RABBITMQ_HOST $RABBITMQ_PORT; do
  echo "RabbitMQ is unavailable - retrying in 2 seconds..."
  sleep 2
done

echo "RabbitMQ is up - starting the app..."
node dist/index.js
