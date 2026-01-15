---
tags:
  - build
  - deploy
  - vite
  - config
---

# Build & Deployment

**Last Updated**: 2026-01-15

---

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:5173` |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build on `http://localhost:4173` |

---

## Environment Variables

### Built-in Variables

| Variable | Value |
|----------|-------|
| `import.meta.env.DEV` | `true` in development |
| `import.meta.env.PROD` | `true` in production |
| `import.meta.env.MODE` | `'development'` or `'production'` |

### Custom Variables

Create `.env` file:

```
VITE_APP_NAME=Todo App
```

> Note: Prefix with `VITE_` to expose to client code.

---

## Deployment Steps

### Static Site Hosting

Build output is static files (HTML, JS, CSS).

#### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

#### Vercel

1. Connect repository
2. Build command: `npm run build`
3. Output directory: `dist`

#### GitHub Pages

1. Run `npm run build`
2. Configure base path if subdirectory:

   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/repo-name/',
   })
   ```

3. Deploy `dist/` folder

#### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

---

## Documentation Build

| Command | Description |
|---------|-------------|
| `pip install mkdocs mkdocs-material` | Install MkDocs |
| `cd docs && mkdocs serve` | Serve docs on `http://127.0.0.1:8000` |
| `cd docs && mkdocs build` | Build docs to `docs/site/` |

---

## Related Documentation

- [Architecture](architecture.md)
- [Styling](styling.md)
