FROM python:3.9-slim

# working directory
WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Expose the port the app runs on
EXPOSE 5000

ENV PYTHONUNBUFFERED=1

# Command to run the Flask app
CMD ["python", "app.py"]
#CMD ["python", "-m", "pyshacl", "-s", "/data/shapes.ttl", "-d", "/data/graph.ttl"]