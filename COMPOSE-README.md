
# 🐳 Multi-Environment Docker Compose Setup

This project supports two modes of Docker deployment using separate Compose files:

---

## 🧪 Development Mode

Uses local source code and rebuilds images from `./frontend` and `./backend`.

### 🔧 File: `docker-compose.dev.yml`

```bash
docker-compose -f docker-compose.dev.yml up --build
```

- Rebuilds images from source code
- Mounts local `logs.json` file for backend
- Auto-reloads if Dockerfiles or code are changed

---

## 🚀 Production Mode (via Docker Hub Images)

Runs the app using pre-built Docker images pulled from Docker Hub.

### 🔧 File: `docker-compose.prod.yml`

```bash
docker-compose -f docker-compose.prod.yml up
```

- No local build required
- Pulls `shubhamkhatik/test:frontendv1` and `...:backendv1` from Docker Hub
- Ideal for deployment to servers or CI/CD

---

## 📁 File Summary

| File | Purpose |
|------|---------|
| `docker-compose.dev.yml` | Local development with live rebuilds |
| `docker-compose.prod.yml` | Run production-ready images from Docker Hub |

---

## 🧠 Notes

- Both modes expose the same ports: `5173` for frontend, `5000` for backend
- You must update `image:` tags in `prod` file as new versions are pushed
- `.env` is used to inject `VITE_API_URL` in dev mode
