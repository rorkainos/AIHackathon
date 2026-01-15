---
tags:
  - build
  - deploy
  - vite
  - config
---

# Build & Deployment

**Last Updated**: 2025-01-15

---

## Build Commands

### Development Server

```bash
npm run dev
```

Starts Vite dev server on `http://localhost:5173`

### Production Build

```bash
npm run build
```

1. Runs TypeScript compiler (`tsc -b`)
2. Runs Vite build
3. Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Serves `dist/` directory on `http://localhost:4173`

### Documentation Build

```bash
cd docs
pip install mkdocs mkdocs-material
mkdocs serve
```

Serves documentation on `http://127.0.0.1:8000/`

---

## Environment Variables

### Built-in Variables

| Variable               | Value                             |
| ---------------------- | --------------------------------- |
| `import.meta.env.DEV`  | `true` in development             |
| `import.meta.env.PROD` | `true` in production              |
| `import.meta.env.MODE` | `'development'` or `'production'` |

### Custom Variables

**.env**:

```
VITE_APP_NAME=Todo App
```

**.env.local** (gitignored):

```
VITE_API_URL=http://localhost:3000
```

**.env.production**:

```
VITE_API_URL=https://api.example.com
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
     base: "/repo-name/",
   });
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

## Related Documentation

- [Architecture](architecture.md)
- [Styling](styling.md)
