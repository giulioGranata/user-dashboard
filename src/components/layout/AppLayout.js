import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './AppLayout.module.css';
export function AppLayout({ children }) {
    return (_jsx("div", { className: styles.root, children: _jsxs("div", { className: styles.inner, children: [_jsxs("header", { className: styles.header, children: [_jsx("h1", { className: styles.title, children: "Team Directory" }), _jsx("p", { className: styles.subtitle, children: "Track your organization at a glance. Filter by role, search by name, and review up-to-date status information with a responsive, accessible experience." })] }), _jsx("main", { children: children })] }) }));
}
