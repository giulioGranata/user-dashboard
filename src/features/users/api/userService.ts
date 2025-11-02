import type { UserResponse, UserRole, UserSummary } from '@/features/users/types/user';
import axios from 'axios';

const BASE_API_URL = 'https://dummyjson.com';
const DEFAULT_LIMIT = 20;

export interface FetchUsersParams {
  skip?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
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
    const search = params?.search?.trim();
    const role = params?.role && params.role !== 'all' ? params.role : undefined;

    // Build URL based on filters
    let url: string;
    const skipAndLimit = `limit=${limit}&skip=${skip}`;

    if (search && search.length >= 3) {
      // Search endpoint: /users/search?q=<query>
      url = `${BASE_API_URL}/users/search?q=${encodeURIComponent(search)}&${skipAndLimit}`;
    } else if (role) {
      // Filter endpoint: /users/filter?key=role&value=<role>
      url = `${BASE_API_URL}/users/filter?key=role&value=${role}&${skipAndLimit}`;
    } else {
      // Default endpoint: /users
      url = `${BASE_API_URL}/users/?${skipAndLimit}`;
    }

    const response = await axios.get<{
      users: UserResponse[];
      total: number;
      skip: number;
      limit: number;
    }>(url);

    let users = response.data.users;
    let total = response.data.total;

    // Apply client-side role filter if both search and role are present
    if (search && role) {
      users = users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
      total = users.length;
    }

    const normalizedUsers: UserSummary[] = users.map((user) => ({
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      role: user.role.toLowerCase() as UserRole,
      avatarUrl: user.image || `https://picsum.photos/seed/${user.username}/128`,
      phone: user.phone ?? 'N/A',
      location: formatLocation(user) || 'Remote',
    }));

    return {
      users: normalizedUsers,
      total,
      skip: response.data.skip,
      limit: response.data.limit,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
    throw error;
  }
}
