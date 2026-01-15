---
tags:
  - build
  - deploy
  - vite
  - config
---

# Build & Deployment

**Last Updated**: 2026-01-14

## Overview

The Todo App uses Vite as its build tool, providing fast development server with Hot Module Replacement (HMR) and optimized production builds. TypeScript compilation is integrated into the build process.

## Build Configuration

### Vite Configuration

**Location**: [vite.config.ts](../../../vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

**Plugins**:

- `@vitejs/plugin-react`: Enables React Fast Refresh, JSX transformation

**Default Settings**:

- Entry point: `index.html`
- Output directory: `dist/`
- Public assets: `public/`

### TypeScript Configuration

**Location**: [tsconfig.json](../../../tsconfig.json)

Main TypeScript configuration for application code.

**Location**: [tsconfig.node.json](../../../tsconfig.node.json)

TypeScript configuration for Vite config file.

### PostCSS Configuration

**Location**: [postcss.config.js](../../../postcss.config.js)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Plugins**:

- `tailwindcss`: Processes Tailwind directives
- `autoprefixer`: Adds vendor prefixes for browser compatibility

## Package Scripts

**Location**: [package.json](../../../package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### Development Server

```bash
npm run dev
```

**What it does**:

- Starts Vite dev server on `http://localhost:5173`
- Enables Hot Module Replacement (HMR)
- Watches for file changes
- Fast refresh for React components
- Source maps for debugging

**Output**:
```
  VITE v6.0.5  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Features**:

- Instant server start (~200ms)
- Lightning-fast HMR (<50ms)
- On-demand compilation
- Optimized dependency pre-bundling

### Production Build

```bash
npm run build
```

**What it does**:
1. Runs TypeScript compiler (`tsc -b`)
   - Type checks all files
   - Generates type declarations
   - Fails build if type errors exist
2. Runs Vite build
   - Bundles application code
   - Minifies JavaScript and CSS
   - Optimizes assets
   - Generates source maps
   - Outputs to `dist/` directory

**Output Structure**:
```
dist/
├── index.html           # Entry HTML file
├── assets/
│   ├── index-[hash].js  # Main JavaScript bundle
│   ├── index-[hash].css # Compiled CSS
│   └── ...              # Other assets (fonts, images)
└── vite.svg             # Public assets
```

**Optimizations**:

- Code splitting
- Tree shaking (removes unused code)
- Minification (Terser for JS, cssnano for CSS)
- Asset hashing for cache busting
- Gzip/Brotli compression ready

### Preview Production Build

```bash
npm run preview
```

**What it does**:

- Serves the `dist/` directory locally
- Runs on `http://localhost:4173`
- Tests production build before deployment
- Mimics production environment

**Use Cases**:

- Verify build output
- Test production optimizations
- Check for build-related issues
- Final QA before deployment

## Dependencies

### Production Dependencies

From [package.json](../../../package.json):

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^5.0.2",
    "date-fns": "^4.1.0"
  }
}
```

**Sizes** (approximate, minified + gzipped):

- `react` + `react-dom`: ~130 KB
- `zustand`: ~1 KB
- `date-fns`: ~10-20 KB (only imported functions)

**Total**: ~150 KB (excellent for modern web app)

### Development Dependencies

```json
{
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20"
  }
}
```

Not included in production bundle.

## Build Optimizations

### Code Splitting

Currently single bundle (suitable for small app). For larger apps:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'date-vendor': ['date-fns'],
        }
      }
    }
  }
})
```

### Tree Shaking

Vite automatically removes unused exports:

```typescript
// Only imported functions from date-fns are included
import { format, startOfDay } from 'date-fns';
// Other date-fns functions are not in bundle
```

### Asset Optimization

**Images**: Optimize before adding to `public/`
- Use WebP format for modern browsers
- Compress PNG/JPEG files
- Consider lazy loading for images below fold

**Fonts**: 
- Use system fonts (current approach)
- Or subset custom fonts to reduce size

### CSS Purging

Tailwind automatically purges unused styles in production:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Result: ~10-20 KB CSS instead of 3+ MB
}
```

## Environment Variables

### Development vs Production

Vite uses `import.meta.env` for environment variables:

```typescript
// Access environment
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE; // 'development' or 'production'
```

### Custom Environment Variables

Create `.env` files:

**.env** (base, committed):
```
VITE_APP_NAME=Todo App
```

**.env.local** (local overrides, gitignored):
```
VITE_API_URL=http://localhost:3000
```

**.env.production** (production values):
```
VITE_API_URL=https://api.example.com
```

**Usage**:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note**: Must prefix with `VITE_` to be exposed to client code.

## Deployment Options

### Static Site Hosting

The built app is a static site (HTML, JS, CSS) that can be hosted anywhere.

#### Netlify

1. **Connect Repository**
   ```bash
   # Netlify auto-detects Vite configuration
   ```

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Push to main branch
   - Automatic deployment on push

#### Vercel

1. **Connect Repository**
   ```bash
   vercel
   ```

2. **Configure**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist"
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

#### GitHub Pages

1. **Build**
   ```bash
   npm run build
   ```

2. **Configure Base Path** (if deploying to subdirectory)
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/repo-name/',
   })
   ```

3. **Deploy**
   ```bash
   # Using gh-pages package
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

#### AWS S3 + CloudFront

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

3. **Configure CloudFront**
   - Set S3 bucket as origin
   - Enable HTTPS
   - Set error page to `index.html` (for SPA routing)

#### Docker Container

```dockerfile
# Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build & Run**:
```bash
docker build -t todo-app .
docker run -p 80:80 todo-app
```

### Custom Server

Serve with any static file server:

```bash
# Using serve package
npx serve -s dist

# Using http-server
npx http-server dist

# Using Python
python -m http.server -d dist 8000
```

## Performance Metrics

### Build Time

- **Development server start**: ~200-300ms
- **Production build**: ~5-10 seconds
- **Type checking**: ~2-3 seconds

### Bundle Size

- **JavaScript**: ~150 KB (minified + gzipped)
- **CSS**: ~10-20 KB (Tailwind purged)
- **Total**: ~170 KB initial load

### Lighthouse Scores (typical)

- **Performance**: 95-100
- **Accessibility**: 90-95
- **Best Practices**: 95-100
- **SEO**: 90-95

## CI/CD Pipeline Examples

### GitHub Actions

**.github/workflows/deploy.yml**:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI

**.gitlab-ci.yml**:
```yaml
image: node:18

stages:
  -Performance Metrics

### Build Time

- **Development server start**: ~200-300ms
- **Production build**: ~5-10 seconds
- **Type checking**: ~2-3 seconds

### Bundle Size

- **JavaScript**: ~150 KB (minified + gzipped)
- **CSS**: ~10-20 KB (Tailwind purged)
- **Total**: ~170 KB initial load

### Lighthouse Scores (typical)

- **Performance**: 95-100
- **Accessibility**: 90-95
- **Best Practices**: 95-100
- **SEO**: 90-95

## Troubleshooting

### Type Check Failures

```bash
# Run type checking separately
npx tsc --noEmit
```

### Build Hangs

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Module Resolution Issues

```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Production Preview Not Working

```bash
# Ensure build succeeded
npm run build
# Check dist/ directory exists
ls -la dist/
# Try different port
npx serve -s dist -p 3000
```

## Related Documentation

- [Architecture](./architecture.md) - Vite in tech stack
- [Styling](./styling.md) - PostCSS and Tailwind configuration
- [Components](./components.md) - How components are bundled
