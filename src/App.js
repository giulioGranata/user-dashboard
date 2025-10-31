import { jsx as _jsx } from "react/jsx-runtime";
import { AppLayout } from './components/layout/AppLayout';
import { UserDashboard } from './features/users/components/UserDashboard';
function App() {
    return (_jsx(AppLayout, { children: _jsx(UserDashboard, {}) }));
}
export default App;
