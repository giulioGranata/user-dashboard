import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function Providers({ children }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false
            }
        }
    });
    return _jsx(QueryClientProvider, { client: queryClient, children: children });
}
export function renderWithProviders(ui) {
    return render(ui, { wrapper: Providers });
}
