# GnaryX_TA_FE — GnaryLex

Modern English vocabulary learning platform for Vietnamese learners (Frontend).

**GnaryLex** — *English Vocabulary*

A professional EdTech web application designed to help Vietnamese learners master English vocabulary through flashcards, quizzes, spaced repetition, and gamification.

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Router**
- **Lucide React** (icons)
- **Recharts** (charts)
- **Framer Motion** (animations)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── common/       # Buttons, Cards, Inputs, Badges, etc.
│   ├── layout/       # Sidebar, Header, Navigation
│   ├── auth/         # Auth-specific components
│   └── dashboard/    # Dashboard components
├── pages/            # Route pages (Login, Dashboard, etc.)
├── routes/           # React Router config & guards
├── services/         # API-ready service layer (mock data)
├── types/            # TypeScript interfaces
├── data/             # Mock data
├── hooks/            # Custom hooks (useAuth, useDashboard, useTheme)
├── utils/            # Utilities & helpers
└── constants/        # Brand & navigation constants
```

## Features Implemented

### Authentication System
- ✅ Login with email/password
- ✅ User registration
- ✅ Forgot password flow
- ✅ Google Sign In (UI ready)
- ✅ Remember me functionality
- ✅ Form validation & error handling
- ✅ Auth guards & protected routes

### Dashboard
- ✅ Personalized greeting & daily goal tracking
- ✅ Statistics cards (Words Learned, Review Today, Streak, Study Time)
- ✅ Continue Learning card with progress
- ✅ Today's Learning Plan checklist
- ✅ Word of the Day with pronunciation
- ✅ Recent Activity timeline
- ✅ Loading & error states
- ✅ Fully responsive design

### Layout & Design
- ✅ Professional sidebar navigation
- ✅ Responsive header with notifications
- ✅ Mobile navigation (hamburger menu)
- ✅ Dark mode support
- ✅ Modern EdTech visual style
- ✅ Smooth animations with Framer Motion

## Implementation Phases

- [x] Phase 1: Project setup
- [x] Phase 2: Global design system
- [x] Phase 3: Layout (Sidebar, Header, Navigation)
- [x] Phase 4: Authentication (Login, Register, Forgot Password)
- [x] Phase 5: Dashboard (Daily Goals, Stats, Learning Hub)
- [ ] Phase 6+: Vocabulary, Flashcards, Practice, Quiz, Progress

## License

Private — GnaryX Project
