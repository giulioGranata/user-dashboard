import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Spinner.module.css';
export function Spinner({ label = 'Loading' }) {
    return (_jsxs("div", { className: styles.spinner, role: "status", "aria-live": "polite", "aria-busy": "true", children: [_jsx("span", { className: styles.circle, "aria-hidden": true }), _jsx("span", { children: label })] }));
}
