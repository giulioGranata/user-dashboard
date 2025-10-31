import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/userService';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5
  });
}
