export type UserRole = 'admin' | 'moderator' | 'user' | 'all';

export interface UserSummary {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  phone: string;
  location: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  image?: string;
  phone?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  company?: {
    name?: string;
    department?: string;
  };
}
