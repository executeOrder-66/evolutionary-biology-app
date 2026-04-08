# Terminal Commands — Quick Reference

## Run the app

```bash
npm run dev
```

Opens the app at `http://localhost:5173` (or similar — the terminal will show the exact URL).
Press `Ctrl + C` to stop it.

---

## Run tests

```bash
npm run test
```

Runs all tests and shows pass/fail results. Press `q` to quit.

---

## Check for code errors (lint)

```bash
npm run lint
```

Reports any TypeScript/style errors. Aim for zero warnings.

---

## Build for production

```bash
npm run build
```

Compiles the app into the `dist/` folder. Run this to check the app has no build errors before sharing it.

---

## Preview the production build

```bash
npm run preview
```

Serves the `dist/` folder locally so you can test the built version. Run `npm run build` first.

---

## Troubleshooting

**App won't start / missing packages:**
```bash
npm install
```
Run this if you get errors about missing modules, or after pulling new changes from git.

**Port already in use:**
```bash
npm run dev -- --port 3001
```
Uses a different port if 5173 is taken.

**Clear cached build files and restart:**
```bash
rm -rf dist node_modules/.vite && npm run dev
```

**Check Node.js version (should be 18+):**
```bash
node --version
```
