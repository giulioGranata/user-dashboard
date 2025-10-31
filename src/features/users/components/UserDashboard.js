import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Spinner } from '../../../components/users/Spinner';
import { useUserFilters } from '../hooks/useUserFilters';
import { useUsers } from '../hooks/useUsers';
import styles from './UserDashboard.module.css';
import { UserDetailModal } from './UserDetailModal';
import { UserFilters } from './UserFilters';
import { UserList } from './UserList';
export function UserDashboard() {
    const { data: users = [], isLoading, isError, refetch } = useUsers();
    const { filters, filteredUsers, setRole, setSearch } = useUserFilters(users);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (!selectedUser) {
            return;
        }
        const stillVisible = filteredUsers.some((user) => user.id === selectedUser.id);
        if (!stillVisible) {
            setSelectedUser(null);
            setIsModalOpen(false);
        }
    }, [filteredUsers, selectedUser]);
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (_jsxs("section", { className: styles.dashboard, "aria-labelledby": "user-directory", children: [_jsx("h2", { id: "user-directory", className: styles.sectionTitle, children: "Team directory" }), _jsx(UserFilters, { filters: filters, onSearchChange: setSearch, onRoleChange: setRole, total: filteredUsers.length }), isLoading && _jsx(Spinner, { label: "Loading users" }), isError && (_jsxs("div", { role: "alert", className: styles.emptyState, children: [_jsx("h3", { children: "We could not load the users" }), _jsx("p", { children: "Please check your connection and try again." }), _jsx("button", { type: "button", onClick: () => refetch(), children: "Retry" })] })), filteredUsers.length === 0 && !isLoading ? (_jsxs("div", { className: styles.emptyState, children: [_jsx("h3", { children: "No users match your filters" }), _jsx("p", { children: "Try updating the search term or selecting a different role." })] })) : (_jsx(UserList, { users: filteredUsers, isLoading: isLoading, selectedUserId: selectedUser?.id, onSelectUser: handleSelectUser })), selectedUser && isModalOpen && (_jsx(UserDetailModal, { user: selectedUser, onClose: handleCloseModal }))] }));
}
