import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import styles from './UserListItem.module.css';
export function UserListItem({ user, isActive, onSelect, disabled }) {
    const statusClassName = clsx({
        [styles.statusActive]: user.status === 'Active',
        [styles.statusInactive]: user.status === 'Inactive',
        [styles.statusOut]: user.status === 'Out of office'
    });
    return (_jsxs("button", { type: "button", className: clsx(styles.item, isActive && styles.itemActive), onClick: onSelect, disabled: disabled, role: "listitem", children: [_jsx("img", { src: user.avatarUrl, alt: `${user.fullName} avatar`, className: styles.avatar }), _jsxs("div", { className: styles.info, children: [_jsx("span", { className: styles.name, children: user.fullName }), _jsxs("div", { className: styles.meta, children: [_jsx("span", { className: styles.role, children: user.role }), _jsx("span", { className: statusClassName, children: user.status })] }), _jsx("span", { className: styles.meta, children: user.email })] }), _jsx("span", { className: styles.cta, "aria-hidden": "true", children: "View profile" })] }));
}
