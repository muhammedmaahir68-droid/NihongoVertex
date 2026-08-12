# Nihongo Vertex — Complete JLPT AI Platform

## Complete modules
N5 / N4 / N3 / N2 / N1, AI exam planner, daily roadmap foundation, personal AI tutor architecture, Hiragana, Katakana, Kanji, romaji/pronunciation, visual memory, object associations, writing canvas, microphone speaking practice, learned-order recall, vocabulary, grammar, listening, speaking, writing, quick revision, quizzes and mock-exam architecture.

## Backend
FastAPI + PostgreSQL + SQLAlchemy + Alembic + Redis.

## Infrastructure
Docker, Docker Compose, Kubernetes deployments, HPA and Vercel configuration.

## Run
```bash
npm install
npm run dev
```

Full local stack:
```bash
docker compose up --build
```

Frontend: http://localhost:5173  
API: http://localhost:8000  
API docs: http://localhost:8000/docs
