import { jsx as _jsx } from "react/jsx-runtime";
import { UserListItem } from './UserListItem';
import styles from './UserList.module.css';
export function UserList({ users, selectedUserId, onSelectUser, isLoading }) {
    return (_jsx("div", { className: styles.list, role: "list", "aria-live": "polite", children: users.map((user) => (_jsx(UserListItem, { user: user, isActive: selectedUserId === user.id, onSelect: () => onSelectUser(user), disabled: isLoading }, user.id))) }));
}
