#!/bin/bash

while true; do
  curl -X POST -H "Content-Type: application/json" -d '{"id": 1234, "unix_ts": 1684129671, "user_id": 123456, "event_name": "login"}' http://localhost:8000/fable/log
  sleep 0.001 # Delay for 1 millisecond (1000 requests per second)
done