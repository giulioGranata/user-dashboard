# User Dashboard

A responsive and accessible React + TypeScript dashboard for browsing users, filtering by role, and reviewing individual profiles.

## Features

- **User List Display** - Fetch and display users from API
- **Filtering & Search** - Filter by role and search by name with debounced input
- **User Detail View** - Modal with user details (profile picture, name, email, role, phone, location)
- **Infinite Scroll** - Load users progressively as you scroll
- **Light/Dark Theme** - Toggle between themes
- **Loading & Error States** - Proper feedback for async operations
- **Responsive Design** - Works on desktop and mobile devices
- **Accessibility** - Semantic HTML, ARIA attributes, keyboard navigation

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) with SWC React plugin
- [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching and caching
- [react-infinite-scroll-hook](https://github.com/onderonur/react-infinite-scroll-hook) for infinite scroll
- [Axios](https://axios-http.com/) for API communication
- [CSS Modules](https://github.com/css-modules/css-modules) for component-scoped styling
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

The app runs at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm test
```

Run `npm run test:watch` for watch mode.

## Project Structure

```
src/
  components/
    layout/              # Page shell
    users/               # Shared user-centric UI (spinner)
    icons/               # SVG icon components
  features/
    users/
      api/               # API client and data normalization
      components/        # Feature-specific UI components
      hooks/             # Data fetching and filtering hooks
      types/             # TypeScript contracts
      __tests__/         # Unit tests
  styles/                # Global styles
  test/                  # Testing utilities and setup
```

## Data Source

User data is fetched from `https://dummyjson.com/users` with pagination support (skip and limit parameters). The infinite scroll loads 20 users at a time.

## Technology Choices

### React Query (@tanstack/react-query)

Data fetching, caching, and state management with built-in support for infinite queries.

### CSS Modules

Component-scoped styling with type-safe class names, no runtime overhead.

### Vite

Fast development server with HMR and modern ES modules support.

### react-infinite-scroll-hook

Library for infinite scroll using Intersection Observer API.

### Debouncing for Search

Custom `useDebounce` hook reduces API calls during typing (300ms delay).

### Feature-Based Architecture

Code organized by feature with co-located components, hooks, and types.

### TypeScript

Type safety at compile-time with improved IDE support.

## Accessibility

- Semantic HTML landmarks (sections, headings)
- ARIA roles and attributes for assistive technologies
- Keyboard navigation support (Tab, Escape, focus management)
- Live regions for dynamic content updates
- Focus trap in modal dialogs
- High contrast responsive layout

## Code Quality

- TypeScript types/interfaces used throughout
- Components are modular and reusable
- Unit tests covering user list rendering, filtering logic, and modal interactions
- Component-driven design with separation of concerns
