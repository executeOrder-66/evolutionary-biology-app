# Project Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

### Required Software
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Version control system
- **Visual Studio Code**: Recommended IDE with extensions:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

### Optional (for cross-platform development)
- **Xcode**: For iOS development (macOS only)
- **Android Studio**: For Android development
- **Electron**: For desktop app development

## Project Initialization

### Step 1: Create Project Directory
```bash
mkdir evolutionary-biology-app
cd evolutionary-biology-app
```

### Step 2: Initialize Git Repository
```bash
git init
echo "# Evolutionary Biology App" > README.md
echo "node_modules/" > .gitignore
git add .
git commit -m "Initial commit"
```

### Step 3: Initialize npm Project
```bash
npm init -y
```

### Step 4: Install Core Dependencies
```bash
# React and TypeScript
npm install react react-dom
npm install -D @types/react @types/react-dom typescript

# Build tools
npm install -D vite @vitejs/plugin-react

# State management
npm install zustand

# Visualization
npm install d3 @types/d3
npm install chart.js react-chartjs-2

# Styling
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react

# Animation
npm install framer-motion

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Development tools
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

### Step 5: Configure TypeScript
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### Step 6: Configure Vite
Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Step 7: Configure Tailwind CSS
Initialize Tailwind:
```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 8: Configure ESLint and Prettier
Create `.eslintrc.cjs`:
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

Create `.prettierrc`:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Step 9: Create Basic Project Structure
```bash
mkdir -p src/components src/hooks src/stores src/engines src/types src/utils src/data src/styles
```

### Step 10: Create Entry Point Files

Create `src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Create `src/App.tsx`:
```typescript
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Evolutionary Biology App</h1>
        <p>Coming soon...</p>
      </div>
    </>
  )
}

export default App
```

Create `index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Evolutionary Biology App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 11: Set Up Testing
Update `vite.config.ts` for testing:
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

### Step 12: Add npm Scripts
Update `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "format": "prettier --write ."
  }
}
```

### Step 13: First Build and Test
```bash
npm run build
npm run test
npm run lint
npm run format
```

## Cross-Platform Setup (Optional)

### Capacitor Setup (Mobile Apps)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Evolutionary Biology App" "com.evolutionarybiology.app"
npm install @capacitor/ios @capacitor/android
```

**Note:** Mobile app development is planned as a long-term goal (Phase 4) after the core web application is complete and tested.

### Electron Setup (Desktop App)
```bash
npm install -D electron electron-builder
```

Create `electron/main.js`:
```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

**Note:** Desktop app development is also planned for Phase 4 alongside mobile development.

## Development Workflow

### Starting Development
```bash
npm run dev
```

### Running Tests
```bash
npm run test
npm run test:ui  # Visual test interface
```

### Code Quality
```bash
npm run lint
npm run format
```

### Building for Production
```bash
npm run build
npm run preview
```

## Next Steps

With the basic project setup complete, you can now:

1. **Implement core components** following the UI design specifications
2. **Build the simulation engine** using the data models
3. **Create visualization components** with D3.js
4. **Add educational content** and scenarios
5. **Implement cross-platform deployment**

Refer to the other planning documents for detailed implementation guidance:
- `app-overview.md`: High-level project goals
- `simulation-models.md`: Detailed simulation specifications
- `ui-design.md`: Interface design specifications
- `data-models.md`: TypeScript interfaces and schemas
- `technical-architecture.md`: System architecture details
- `development-roadmap.md`: Phased development plan

This setup provides a solid foundation for building the Evolutionary Biology App with modern web technologies and best practices.