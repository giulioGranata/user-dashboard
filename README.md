# User Dashboard

A responsive and accessible React + TypeScript dashboard for browsing users, filtering by role, and reviewing individual profiles.

## ✨ Features

- **User directory** powered by the public [DummyJSON users API](https://dummyjson.com/users)
- **Infinite scroll** for seamless loading of users as you scroll
- **Debounced search** with instant input feedback and optimized filtering
- **Filtering** by role and free-text search
- **Detail panel** with contact information, status, and avatar previews
- **Light/dark theme** toggle for personalized viewing experience
- **Robust states** for loading, errors, and empty results
- **Responsive layout** that adapts from mobile to large screens
- **Automated tests** covering list rendering and filtering flows

## 🛠️ Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) with the SWC React plugin
- [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching and caching
- [react-infinite-scroll-hook](https://github.com/onderonur/react-infinite-scroll-hook) for infinite scroll functionality
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
npm start
# or
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

User data is fetched from `https://dummyjson.com/users` with pagination support (skip and limit parameters). Each record is normalized to include a consistent role, status, and fallback avatar so the UI remains stable even if fields are missing. The infinite scroll loads 20 users at a time.

## ✅ Accessibility & UX considerations

- Semantic landmarks (sections, headings, ARIA roles) for assistive technologies
- Keyboard-friendly focus styles and button semantics
- Live regions for loading indicators and filtered counts
- High-contrast, responsive layout tuned for both desktop and mobile

## 🧪 Technology Choices & Reasoning

This section explains the key technology decisions and their rationale:

### React Query (@tanstack/react-query)

**Why:** React Query provides powerful data fetching, caching, and synchronization capabilities out of the box. It eliminates the need for manual loading states, error handling, and cache management.

**Benefits:**
- Automatic background refetching and stale-while-revalidate pattern
- Built-in support for infinite queries via `useInfiniteQuery`
- Optimistic updates and request deduplication
- Excellent developer experience with TypeScript support

### CSS Modules

**Why:** CSS Modules provide component-scoped styling without the runtime overhead of CSS-in-JS solutions. They enable type-safe class names and prevent style conflicts.

**Benefits:**
- Scoped styles prevent naming conflicts
- TypeScript integration with `@css-modules-kit/ts-plugin` for autocomplete
- No runtime CSS-in-JS overhead
- Easy to migrate to other styling solutions if needed

### Vite

**Why:** Vite offers a significantly faster development experience compared to traditional bundlers like Webpack, with near-instant Hot Module Replacement (HMR).

**Benefits:**
- Fast dev server startup and HMR
- Modern build tooling with native ES modules support
- Built-in TypeScript support without additional configuration
- Optimized production builds with Rollup

### react-infinite-scroll-hook

**Why:** For infinite scroll, we use the well-tested `react-infinite-scroll-hook` library which provides a clean API and handles edge cases automatically.

**Benefits:**
- Battle-tested library used by 6.4k+ projects
- Clean, simple API that wraps Intersection Observer
- Handles edge cases automatically (disabled state, errors, etc.)
- Configurable rootMargin for triggering load before reaching the end
- Reduces maintenance burden compared to custom implementation

### Debouncing for Search

**Why:** A custom `useDebounce` hook was implemented to optimize search performance and user experience.

**Benefits:**
- Reduces unnecessary filtering operations during typing
- Improves perceived performance with instant input feedback
- Configurable delay (300ms default) balances responsiveness and efficiency
- Simple, reusable hook that can be used across the application

### Architecture: Feature-Based Structure

**Why:** The codebase follows a feature-based architecture rather than a component-based one.

**Benefits:**
- Related code (components, hooks, types, API) co-located by feature
- Easier to understand and maintain
- Scales well as the application grows
- Clear separation of concerns between features and shared components

### TypeScript

**Why:** TypeScript provides compile-time type safety and better developer experience.

**Benefits:**
- Catch errors at build time rather than runtime
- Better IDE autocomplete and refactoring support
- Self-documenting code through types
- Easier onboarding for new developers

## 🧪 Extending the app

- Persist filters using the URL query string or localStorage
- Add more filter options (status, location, etc.)
- Implement user sorting options
- Add bulk actions for users

## 📄 License

This project is provided for assessment purposes.
