# Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications. It's free and takes just a few minutes.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up/login

3. **Click "New Project"** and import your GitHub repository

4. **Vercel will auto-detect Next.js** - just click "Deploy"

5. **Wait 2-3 minutes** and you'll get a live URL like: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** - it will ask you to login and configure the project

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Alternative: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Current Status

- ✅ **Local Development**: Running at `http://localhost:3000`
- ⏳ **Production Deployment**: Not yet deployed

## After Deployment

Once deployed, you'll get a public URL that you can share. The app will automatically:
- Build and optimize for production
- Enable HTTPS
- Provide a CDN for fast global access
- Auto-deploy on every git push (if connected to GitHub)

## Build for Production Locally

To test the production build locally:

```bash
npm run build
npm start
```

Then visit `http://localhost:3000` to see the production build.

