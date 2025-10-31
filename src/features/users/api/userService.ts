import axios from 'axios';
import type { UserResponse, UserRole, UserSummary } from '../types/user';

const API_URL = 'https://dummyjson.com/users?limit=100';

const FALLBACK_ROLES: UserRole[] = ['admin', 'manager', 'editor', 'viewer'];

function normalizeRole(role?: string): UserRole {
  if (!role) {
    return FALLBACK_ROLES[Math.floor(Math.random() * FALLBACK_ROLES.length)];
  }

  const normalized = role.toLowerCase();

  if (normalized === 'admin' || normalized === 'editor' || normalized === 'viewer') {
    return normalized;
  }

  if (normalized === 'manager' || normalized === 'moderator') {
    return 'manager';
  }

  return 'viewer';
}

function deriveStatus(id: number): UserSummary['status'] {
  const statuses: UserSummary['status'][] = ['Active', 'Inactive', 'Out of office'];
  return statuses[id % statuses.length];
}

function formatLocation(user: UserResponse): string {
  const city = user.address?.city;
  const state = user.address?.state;
  const country = user.address?.country;
  return [city, state, country].filter(Boolean).join(', ');
}

export async function fetchUsers(): Promise<UserSummary[]> {
  const response = await axios.get<{ users: UserResponse[] }>(API_URL);
  return response.data.users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    role: normalizeRole(user.role),
    status: deriveStatus(user.id),
    avatarUrl:
      user.image ??
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.firstName ?? 'User')}`,
    phone: user.phone ?? 'N/A',
    location: formatLocation(user) || 'Remote'
  }));
}
