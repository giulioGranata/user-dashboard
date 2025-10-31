import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from '../../../components/users/Spinner';
import styles from './UserDetailPanel.module.css';
export function UserDetailPanel({ user, isLoading }) {
    if (isLoading) {
        return _jsx(Spinner, { label: "Loading profile" });
    }
    if (!user) {
        return (_jsx("p", { className: styles.placeholder, children: "Select a teammate to see their contact information and current availability." }));
    }
    return (_jsxs("div", { className: styles.panel, children: [_jsx("img", { src: user.avatarUrl, alt: `${user.fullName} avatar`, className: styles.avatar }), _jsxs("div", { children: [_jsx("h3", { className: styles.name, children: user.fullName }), _jsx("p", { className: styles.metaValue, children: user.status })] }), _jsxs("dl", { className: styles.metaList, children: [_jsxs("div", { className: styles.metaItem, children: [_jsx("dt", { className: styles.metaLabel, children: "Role" }), _jsx("dd", { className: styles.metaValue, children: user.role })] }), _jsxs("div", { className: styles.metaItem, children: [_jsx("dt", { className: styles.metaLabel, children: "Email" }), _jsx("dd", { className: styles.metaValue, children: user.email })] }), _jsxs("div", { className: styles.metaItem, children: [_jsx("dt", { className: styles.metaLabel, children: "Phone" }), _jsx("dd", { className: styles.metaValue, children: user.phone })] }), _jsxs("div", { className: styles.metaItem, children: [_jsx("dt", { className: styles.metaLabel, children: "Location" }), _jsx("dd", { className: styles.metaValue, children: user.location })] })] })] }));
}
