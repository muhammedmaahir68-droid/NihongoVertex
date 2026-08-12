# Nihongo Vertex Backend

FastAPI + PostgreSQL + Redis foundation for large learner data.

## Local
From the project root:
```bash
docker compose up --build
```

API: http://localhost:8000
Health: http://localhost:8000/health
Docs: http://localhost:8000/docs

## Production database
Use a managed PostgreSQL service with backups, replicas and connection pooling. Keep secrets outside Git.
