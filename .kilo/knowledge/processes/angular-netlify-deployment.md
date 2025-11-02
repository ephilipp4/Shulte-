# Angular Project Deployment to Netlify

## Overview
This document captures the complete process of preparing and deploying an Angular project to Netlify, including all configuration files and deployment settings.

## Project Context
- **Project Name**: Вертикальное Чтение: Тренажер по Методике Шульте (Vertical Reading: Schulte Method Trainer)
- **Framework**: Angular 20.3.0
- **Build Tool**: Angular CLI with Vite
- **Styling**: Tailwind CSS
- **Deployment Platform**: Netlify

## Configuration Files

### netlify.toml
```toml
[build]
  command = "ng build --prod"
  publish = "dist/shulte"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Key Settings:**
- **Build Command**: `ng build --prod` - Production build with optimizations
- **Publish Directory**: `dist/shulte` - Output directory for built files
- **SPA Redirects**: All routes (`/*`) redirect to `index.html` with 200 status for client-side routing

### package.json Build Script
```json
{
  "scripts": {
    "build": "ng build --prod"
  }
}
```

**Updated Build Script:**
- Uses `--prod` flag for production optimizations
- Generates optimized bundles in `dist/shulte` directory

## Build Output Structure
```
dist/
├── index.html          # Main HTML file with Tailwind CDN
├── main-*.js          # Main application bundle
├── 3rdpartylicenses.txt # Third-party licenses
└── prerendered-routes.json # SSR prerendering data
```

## Deployment Checklist

### ✅ Completed Steps
- [x] Configure `netlify.toml` with build command and publish directory
- [x] Set up SPA redirects for client-side routing
- [x] Update `package.json` build script to use `--prod` flag
- [x] Test local build successfully (`npm run build`)
- [x] Verify build output in `dist/shulte` directory
- [x] Prepare deployment instructions

### 🔧 Technical Details

**Angular Build Configuration:**
- Production build with tree-shaking and minification
- Output directory: `dist/shulte`
- Uses Vite as build tool (Angular 17+)
- Includes Tailwind CSS via CDN in production

**Netlify-Specific Requirements:**
- SPA redirect rules for routing support
- Correct publish directory path
- Production build command

## Deployment Instructions

### For Team Members:
1. **Connect Repository**: Link GitHub/GitLab repository to Netlify
2. **Build Settings**:
   - Build command: `ng build --prod`
   - Publish directory: `dist/shulte`
3. **Environment Variables**: Set any required environment variables
4. **Deploy**: Push changes to trigger automatic deployment

### Manual Deployment:
1. Run `npm run build` locally
2. Upload `dist/shulte` folder contents to Netlify
3. Configure redirect rules in Netlify dashboard if needed

## Common Issues & Solutions

### Build Failures
- **Issue**: Build command fails
- **Solution**: Ensure all dependencies are installed (`npm install`)
- **Check**: Verify Node.js version compatibility with Angular 20

### Routing Issues
- **Issue**: 404 errors on page refresh
- **Solution**: SPA redirects configured in `netlify.toml`
- **Alternative**: Create `_redirects` file in publish directory

### Performance Issues
- **Issue**: Slow loading
- **Solution**: Verify production build optimizations are active
- **Check**: Bundle sizes and lazy loading implementation

## Related Knowledge
- **Angular CLI Documentation**: [angular.io/cli](https://angular.io/cli)
- **Netlify Deployment Guide**: [docs.netlify.com](https://docs.netlify.com)
- **SPA Deployment Best Practices**: Client-side routing configuration

## Metadata
- **Created**: 2025-11-02
- **Last Updated**: 2025-11-02
- **Author**: Knowledge Manager
- **Tags**: angular, netlify, deployment, spa, build-configuration
- **Related Files**: `netlify.toml`, `package.json`, `angular.json`</instructions>
</edit_file>