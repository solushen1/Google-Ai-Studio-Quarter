# SDA Quarterly Reports Application

## Overview
A React/TypeScript application for creating and managing Seventh-day Adventist Church quarterly reports. The app runs offline in the browser using client-side storage and includes AI-powered template generation.

## Project Status
✅ Successfully imported and configured for Replit environment  
✅ All dependencies installed and working  
✅ Frontend running on port 5000  
✅ Ready for deployment  

## Architecture
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite with development server on port 5000  
- **Database**: Dexie (IndexedDB) for client-side storage
- **Styling**: Tailwind CSS (via CDN)
- **PDF Generation**: jsPDF with autoTable plugin

## Recent Changes (Import Setup)
- Updated Vite configuration for Replit proxy support (host: 0.0.0.0, port: 5000)
- Fixed security: Removed API keys from client bundle, now requires user input
- Cleaned dependencies: Removed CDN imports, using npm packages
- Added proper .gitignore for environment files
- Configured deployment with build and preview commands
- Fixed PDF generation to use ESM imports instead of globals

## Deployment Configuration
- **Target**: Autoscale (static frontend)
- **Build**: `npm run build`
- **Run**: `npm run start` (Vite preview server)
- **Port**: 5000

## User Setup Required
2. Get API key from: https://ai.google.dev/
3. Enter key in the AI Template Generator when prompted

## Current Workflows
- Frontend Server: `npm run dev` on port 5000 (development)

## Dependencies
- react, react-dom, typescript, vite
- @google/genai, dexie, jspdf, jspdf-autotable
- Various type definitions