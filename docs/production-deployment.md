# Production deployment

The app is split into two deployable services:

- **Frontend:** Vite/React, deployable to Vercel.
- **API:** FastAPI Docker image, deployable to Render, Railway, Fly.io, or Kubernetes.
- **Database:** managed PostgreSQL. The API automatically applies Alembic migrations when it starts.

## Required production environment variables

Set these only in your hosting dashboards or secret manager. Never commit them.

```text
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE?ssl=require
REDIS_URL=redis://REDIS_HOST:6379/0
JWT_SECRET=<long random value>
CORS_ORIGINS=https://YOUR-FRONTEND.vercel.app
```

For the Vercel frontend, add:

```text
VITE_API_BASE_URL=https://YOUR-API-DOMAIN
```

Then redeploy the frontend. Vite reads this value during the build.

## Deploy API from this repository

Create a Docker web service with its root directory set to `backend`. The supplied `backend/Dockerfile` runs `alembic upgrade head` before starting the API. Set the API health-check path to `/health`.

After deployment, open:

```text
https://YOUR-API-DOMAIN/health
https://YOUR-API-DOMAIN/health/db
```

Both must return `status: ok` before connecting the frontend.

## Important current scope

The database schema and deployment connection are ready. Course content and progress are still rendered from the current frontend curriculum/local browser progress. Persisting each learner's progress to PostgreSQL needs user authentication and progress API endpoints; that is a separate application feature, not something a database URL alone can safely infer.
