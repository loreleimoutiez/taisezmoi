# celery_config.py
from celery import Celery
import os

# Initialize Celery
celery = Celery(__name__, broker=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'))
celery.conf.update(
    result_backend=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0'),
)

@celery.task
def process_text(text_chunks):
    # Process the text chunks
    for chunk in text_chunks:
        # Simulate some processing (e.g., store in a database)
        print(f"Processing chunk: {chunk}")
    return "Text processed successfully"
