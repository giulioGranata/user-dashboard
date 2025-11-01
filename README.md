# User Dashboard

A responsive and accessible React + TypeScript dashboard for browsing users, filtering by role, and reviewing individual profiles.

## ✨ Features

- **User directory** powered by the public [DummyJSON users API](https://dummyjson.com/users)
- **Instant filtering** by role and free-text search
- **Detail panel** with contact information, status, and avatar previews
- **Robust states** for loading, errors, and empty results
- **Responsive layout** that adapts from mobile to large screens
- **Automated tests** covering list rendering and filtering flows

## 🛠️ Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) with the SWC React plugin
- [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching and caching
- [Axios](https://axios-http.com/) for API communication
- [CSS Modules](https://github.com/css-modules/css-modules) for component-scoped styling
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests

## 🚀 Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

The app is served at [http://localhost:5173](http://localhost:5173). Changes are hot-reloaded automatically.

### Production build

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project and outputs an optimized production bundle. Use `npm run preview` to inspect the result locally.

### Testing

```bash
npm test
```

Vitest runs the unit tests in a jsdom environment. To watch for changes, execute `npm run test:watch`.

## 🧭 Project structure

```
src/
  components/
    layout/              # Page shell
    users/               # Shared user-centric UI (spinner)
  features/
    users/
      api/               # API client and data normalization
      components/        # Feature-specific UI building blocks
      hooks/             # Data fetching and filtering hooks
      types/             # TypeScript contracts
  providers/             # Global React context providers
  styles/                # Global styles
  test/                  # Testing utilities and setup
```

## 📦 Data source

User data is fetched from `https://dummyjson.com/users?limit=100`. Each record is normalized to include a consistent role, status, and fallback avatar so the UI remains stable even if fields are missing.

## ✅ Accessibility & UX considerations

- Semantic landmarks (sections, headings, ARIA roles) for assistive technologies
- Keyboard-friendly focus styles and button semantics
- Live regions for loading indicators and filtered counts
- High-contrast, responsive layout tuned for both desktop and mobile

## 🧪 Extending the app

- Introduce pagination or infinite scrolling by leveraging React Query’s `getNextPageParam`
- Add a light/dark mode toggle via CSS variables and a theme context
- Persist filters using the URL query string or localStorage

## 📄 License

This project is provided for assessment purposes.
