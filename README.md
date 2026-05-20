# Smart Leads Frontend Dashboard

[![React](https://img.shields.io/badge/React-18.0+-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-blue)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-1.6+-blue)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📋 Overview

A modern, production-ready dashboard for the Smart Leads Management System built with **React 18**, **TypeScript**, and **TailwindCSS**. Features include JWT authentication, lead management, advanced filtering, CSV export, analytics, and dark mode support.

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token management
- Protected routes with authentication guard
- Persistent login sessions
- Toast notifications for user feedback

### 📊 Lead Management
- Complete CRUD operations (Create, Read, Update, Delete)
- Advanced filtering by status and source
- Real-time search with debounced input (500ms delay)
- Sorting by latest/oldest
- Server-side pagination (10 records per page)
- Detailed lead view modal
- Admin-only delete functionality (RBAC)

### 📈 Analytics Dashboard
- Lead statistics and key metrics
- Status distribution chart with percentages
- Source distribution with icons
- Interactive trend charts (daily/weekly/monthly views)
- Top performers leaderboard
- Conversion rate tracking
- Recent activity feed

### 📁 CSV Export
- Export filtered leads data
- Respects current filters (status, source, search)
- One-click download
- Professional CSV formatting

### 🎨 UI/UX Features
- Modern, professional design with gradients
- Fully responsive (mobile, tablet, desktop)
- Dark/Light mode toggle with persistence
- Loading skeletons and spinners
- Empty states with call-to-action
- Form validation with error messages
- Toast notifications for all actions
- Smooth animations and transitions

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI Framework |
| TypeScript | 5.0+ | Type Safety |
| TailwindCSS | 3.0+ | Styling |
| Vite | 5.0+ | Build Tool |
| React Router DOM | 6.20+ | Navigation |
| Axios | 1.6+ | API Calls |
| React Hook Form | 7.48+ | Form Management |
| Zod | 3.22+ | Schema Validation |
| React Hot Toast | 2.4+ | Notifications |
| date-fns | 3.0+ | Date Formatting |

## 📋 Prerequisites

- Node.js (v18 or higher)
- Backend API running (smart-leads-backend)
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-leads-frontend.git
cd smart-leads-frontend
2. Install dependencies
bash
npm install
3. Set up environment variables
bash
cp .env.example .env
Edit the .env file with your backend URL:

env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Smart Leads Dashboard
4. Start the development server
bash
npm run dev
5. Build for production
bash
npm run build
6. Preview production build
bash
npm run preview
🐳 Docker Setup
Build and run with Docker
bash
# Build the Docker image
docker build -t smart-leads-frontend .

# Run the container
docker run -d \
  --name smart-leads-frontend \
  -p 80:80 \
  smart-leads-frontend

# View logs
docker logs -f smart-leads-frontend

# Stop container
docker stop smart-leads-frontend
Docker Compose (with backend)
bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
📁 Project Structure
text
frontend/
├── src/
│   ├── components/
│   │   ├── common/                 # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorAlert.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── DarkModeToggle.tsx
│   │   │
│   │   ├── leads/                 # Lead management components
│   │   │   ├── LeadFilters.tsx
│   │   │   ├── LeadTable.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   ├── LeadDetailModal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── ExportButton.tsx
│   │   │
│   │   └── auth/                  # Authentication components
│   │       └── ProtectedRoute.tsx
│   │
│   ├── pages/                     # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LeadsListPage.tsx
│   │   └── AnalyticsPage.tsx
│   │
│   ├── contexts/                  # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── LeadContext.tsx
│   │   └── AnalyticsContext.tsx
│   │
│   ├── services/                  # API services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── lead.service.ts
│   │   └── analytics.service.ts
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useLeads.ts
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── lead.types.ts
│   │   ├── analytics.types.ts
│   │   └── common.types.ts
│   │
│   ├── utils/                     # Utility functions
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   └── styles/                    # Global styles
│       └── globals.css
│
├── public/
│   └── vite.svg
│
├── .env.example                   # Environment variables template
├── .dockerignore                  # Docker ignore file
├── .gitignore                     # Git ignore file
├── Dockerfile                     # Docker configuration
├── nginx.conf                     # Nginx configuration for Docker
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # TailwindCSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript Node configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # Documentation
🔧 Environment Variables
Variable	Required	Default	Description
VITE_API_URL	Yes	http://localhost:5000/api	Backend API URL
VITE_APP_NAME	No	Smart Leads Dashboard	Application name
🎨 Features Showcase
Dashboard Overview
Welcome message with user profile

Statistics cards (Total Leads, Conversion Rate, Qualified Leads, Avg/Day)

Quick action buttons (Create Lead, View Leads, Analytics)

Recent activity feed

Leads Management Page
Filter sidebar with status, source, search, and sort options

Responsive data table with sortable columns

Status badges with colors

Source icons

Action buttons (Edit, Delete)

Click to view details modal

Pagination with page numbers

CSV export button

Analytics Dashboard
Key metrics at a glance

Leads by Status bar chart

Leads by Source distribution

Interactive trend chart (toggle daily/weekly/monthly)

Top performers leaderboard

Key insights (Qualification Rate, Loss Rate, Lead Velocity)

Recent activity log

Authentication Pages
Modern login form with validation

Registration form with role selection

Password visibility toggle

Form validation errors

Loading states

Toast notifications

Dark Mode
Seamless theme switching

Persists user preference in localStorage

Full dark mode support across all components

Smooth transition animations

📱 Responsive Design
Breakpoint	Screen Size	Layout Adjustments
Mobile	< 640px	Single column, collapsed navigation
Tablet	640px - 1024px	Two columns, compact tables
Desktop	> 1024px	Full layout, multi-column grids
🔗 Connecting to Backend
Make sure your backend is running:

bash
# Start backend
cd ../smart-leads-backend
npm run dev
Then update .env if needed:

env
VITE_API_URL=http://localhost:5000/api
🧪 Testing the Application
Manual Test Flow
Registration

Go to /register

Create a new account

Verify toast notification

Login

Go to /login

Login with credentials

Redirect to dashboard

Create Lead

Go to Leads page

Click "Create Lead"

Fill form and submit

Filter & Search

Use status dropdown

Use source dropdown

Type in search box (debounced)

See results update

Export CSV

Apply filters

Click "Export CSV"

File downloads automatically

Dark Mode

Click dark mode toggle

Theme changes

Reload page - preference persists

🚀 Deployment
Deploy to Netlify
Build the project

bash
npm run build
Deploy via Netlify CLI

bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
Or connect GitHub to Netlify

Go to Netlify

Click "New site from Git"

Connect your GitHub repository

Set build command: npm run build

Set publish directory: dist

Add environment variable: VITE_API_URL

Deploy to Vercel
bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_API_URL
Deploy with Docker
bash
# Build Docker image
docker build -t smart-leads-frontend .

# Run container
docker run -d -p 80:80 --name frontend smart-leads-frontend

# Access at http://localhost
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
MIT © [Your Name]

👨‍💻 Author
Your Name

GitHub: @yourusername

Email: your.email@example.com

🙏 Acknowledgments
React team for amazing framework

TailwindCSS for utility-first CSS

Vite for fast builds

All open-source contributors

📞 Support
For issues, questions, or contributions:

Open an issue on GitHub

Email: your.email@example.com

⭐ Show Your Support
If this project helped you, please give it a star ⭐ on GitHub!

text

## Step 2: Frontend .env.example

**Create this file at:** `D:\ServiceHire\frontend\.env.example`

```env
# ============================================
# SMART LEADS FRONTEND - ENVIRONMENT VARIABLES
# ============================================

# ------------------------
# API CONFIGURATION
# ------------------------
# Backend API URL (required)
VITE_API_URL=http://localhost:5000/api

# For production:
# VITE_API_URL=https://your-backend-api.onrender.com/api

# ------------------------
# APP CONFIGURATION
# ------------------------
# Application name (optional)
VITE_APP_NAME=Smart Leads Dashboard

# ------------------------
# FEATURE FLAGS (Optional)
# ------------------------
# Enable/disable features
# VITE_ENABLE_ANALYTICS=true
# VITE_ENABLE_DARK_MODE=true

# ------------------------
# SENTRY ERROR TRACKING (Optional)
# ------------------------
# VITE_SENTRY_DSN=https://your-sentry-dsn@ingest.sentry.io/project-id

# ------------------------
# GOOGLE ANALYTICS (Optional)
# ------------------------
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
Step 3: Frontend .env (local development)
Create this file at: D:\ServiceHire\frontend\.env

env
# Local Development
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Smart Leads Dashboard
Step 4: Push to GitHub
bash
cd D:\ServiceHire\frontend

