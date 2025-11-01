import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import styles from './UserListItem.module.css';
export function UserListItem({ user, isActive, onSelect, disabled }) {
    return (_jsx("button", { type: "button", className: clsx(styles.item, isActive && styles.itemActive), onClick: onSelect, disabled: disabled, role: "listitem", children: _jsxs("div", { className: styles.info, children: [_jsx("span", { className: styles.name, children: user.fullName }), _jsx("span", { className: styles.role, children: user.role }), _jsx("span", { className: styles.meta, children: user.email })] }) }));
}
