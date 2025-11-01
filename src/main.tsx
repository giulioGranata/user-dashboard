import App from '@/App';
import '@/styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

/* React Query configuration:
    - shared cache,
    - no auto-refetch on focus,
    - single retry on error (to avoid infinite loops)
*/
// Preserve QueryClient across HMR updates
let queryClient: QueryClient;

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 1000 * 60 * 5,
        },
      },
    });
  }
  return queryClient;
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

function renderApp() {
  root.render(
    <QueryClientProvider client={getQueryClient()}>
      <App />
    </QueryClientProvider>
  );
}

renderApp();

// Enable HMR for this module
if (import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    renderApp();
  });
}
