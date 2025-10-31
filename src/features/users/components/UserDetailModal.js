import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { UserDetailPanel } from './UserDetailPanel';
import styles from './UserDetailModal.module.css';
export function UserDetailModal({ user, onClose }) {
    const closeButtonRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);
    if (typeof document === 'undefined') {
        return null;
    }
    return createPortal(_jsx("div", { className: styles.backdrop, role: "presentation", onClick: onClose, children: _jsxs("div", { className: styles.modal, role: "dialog", "aria-modal": "true", "aria-labelledby": "user-profile-title", onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: styles.header, children: [_jsx("h3", { id: "user-profile-title", className: styles.title, children: user.fullName }), _jsx("button", { ref: closeButtonRef, type: "button", className: styles.closeButton, onClick: onClose, children: "Close" })] }), _jsx(UserDetailPanel, { user: user, isLoading: false })] }) }), document.body);
}
