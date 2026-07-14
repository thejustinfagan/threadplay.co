# ThreadPlay.co Deployment

## Repository contents

```text
index.html            Complete public website
Dockerfile            Nginx production image
nginx.conf             Port 8080, health route, gzip, SPA fallback
railway.json           Railway Dockerfile builder configuration
railway.toml           Railway health and restart configuration
.dockerignore          Minimal Docker build context
README.md              Product and repository overview
docs/                  Audit and deployment record
```

## Railway setup

1. Create a Railway service from `thejustinfagan/threadplay.co`.
2. Railway should select the repository's `Dockerfile` builder.
3. Deploy the `main` branch.
4. Confirm the deployment health check passes at `/health`.
5. Generate a temporary Railway domain and verify the website.
6. Add custom domains:
   - `threadplay.co`
   - `www.threadplay.co`
7. Copy Railway's exact DNS records into GoDaddy DNS.
8. Do not guess the CNAME or apex values; use the values shown by Railway for this service.

## Local Docker validation

```bash
docker build -t threadplay-web .
docker run --rm -p 8080:8080 threadplay-web
curl -f http://localhost:8080/health
```

Open `http://localhost:8080`.

## Rollback

Railway deployments are commit-based. Select a previously successful deployment or redeploy an earlier commit from the Railway dashboard.
