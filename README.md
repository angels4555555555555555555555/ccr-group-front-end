# CCR Group Front-End

> A modern web application for CCR Group, built with Next.js, React, Mantine UI, and Tailwind CSS.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CCR Group Front-End is a robust, scalable, and maintainable web application designed for capital holding and asset management operations. It leverages the power of Next.js for SSR/SSG, Mantine for UI components, and Tailwind CSS for rapid styling.

## Features

- Modern dashboard for admin and user roles
- User management (add, edit, password management)
- Authentication flows
- Responsive design
- Modular architecture (features, hooks, utils)
- Integration with REST APIs (via Axios)
- Optimized images and assets

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI:** [React](https://react.dev/), [Mantine](https://mantine.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **State/Data:** [@tanstack/react-query](https://tanstack.com/query/latest)
- **HTTP:** [Axios](https://axios-http.com/)
- **Linting:** ESLint
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

```
src/
  api/           # API calls (auth, admin, user)
  app/           # Next.js app directory (routing, layouts)
  assets/        # Icons, images
  features/      # Feature modules (admin, home, common, etc.)
  hooks/         # Custom React hooks
  providers/     # Context providers
  utils/         # Utility functions (axios, tanstack)
public/          # Static assets
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ccr-group/ccr-group-front-end.git
   cd ccr-group-front-end
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

