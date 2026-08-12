# Kubernetes

For production, use a managed PostgreSQL and Redis service rather than running stateful databases inside the cluster.

1. Build and push API/frontend images.
2. Replace `YOUR_REGISTRY/...` in the deployment files.
3. Create secrets from your secret manager.
4. Apply:
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/secrets.example.yaml
   kubectl apply -f k8s/api-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/hpa.yaml

Do not commit real secrets.
