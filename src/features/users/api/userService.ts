import axios from 'axios';
import type { UserResponse, UserRole, UserSummary } from '@/features/users/types/user';

const BASE_API_URL = 'https://dummyjson.com/users';
const DEFAULT_LIMIT = 20;

const FALLBACK_ROLES: UserRole[] = ['admin', 'manager', 'viewer'];

export interface FetchUsersParams {
  skip?: number;
  limit?: number;
}

function normalizeRole(role?: string): UserRole {
  if (!role) {
    return FALLBACK_ROLES[Math.floor(Math.random() * FALLBACK_ROLES.length)];
  }

  const normalized = role.toLowerCase();

  if (normalized === 'admin' || normalized === 'viewer') {
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

export async function fetchUsers(params?: FetchUsersParams): Promise<{
  users: UserSummary[];
  total: number;
  skip: number;
  limit: number;
}> {
  try {
    const skip = params?.skip ?? 0;
    const limit = params?.limit ?? DEFAULT_LIMIT;
    const url = `${BASE_API_URL}?skip=${skip}&limit=${limit}`;

    const response = await axios.get<{
      users: UserResponse[];
      total: number;
      skip: number;
      limit: number;
    }>(url);

    const normalizedUsers = response.data.users.map((user) => ({
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

    return {
      users: normalizedUsers,
      total: response.data.total,
      skip: response.data.skip,
      limit: response.data.limit
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
    throw error;
  }
}
