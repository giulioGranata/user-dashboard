import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import type { UserSummary } from '@/features/users/types/user';

const mockUsers: UserSummary[] = [
  {
    id: 1,
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'admin',
    status: 'Active',
    avatarUrl: 'https://example.com/ada.png',
    phone: '123-456-7890',
    location: 'London'
  },
  {
    id: 2,
    fullName: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'manager',
    status: 'Active',
    avatarUrl: 'https://example.com/grace.png',
    phone: '123-456-7891',
    location: 'New York'
  },
  {
    id: 3,
    fullName: 'Alan Turing',
    email: 'alan@example.com',
    role: 'viewer',
    status: 'Inactive',
    avatarUrl: 'https://example.com/alan.png',
    phone: '123-456-7892',
    location: 'Manchester'
  },
  {
    id: 4,
    fullName: 'Ada Wong',
    email: 'ada.wong@example.com',
    role: 'manager',
    status: 'Active',
    avatarUrl: 'https://example.com/ada-wong.png',
    phone: '123-456-7893',
    location: 'Tokyo'
  }
];

describe('useUserFilters', () => {
  it('returns all users when no filters are applied', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    expect(result.current.filteredUsers).toHaveLength(4);
    expect(result.current.filters).toEqual({ search: '', role: 'all' });
  });

  it('filters users by role', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setRole('admin');
    });

    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].fullName).toBe('Ada Lovelace');
    expect(result.current.filters.role).toBe('admin');
  });

  it('filters users by search term (case insensitive)', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setSearch('ada');
    });

    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.filteredUsers.map((u) => u.fullName)).toEqual([
      'Ada Lovelace',
      'Ada Wong',
    ]);
    expect(result.current.filters.search).toBe('ada');
  });

  it('filters users by both role and search term', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setSearch('ada');
      result.current.setRole('admin');
    });

    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].fullName).toBe('Ada Lovelace');
    expect(result.current.filteredUsers[0].role).toBe('admin');
  });

  it('handles empty search results correctly', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setSearch('nonexistent');
    });

    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('handles role filter with no matches', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setRole('viewer');
      result.current.setSearch('nonexistent');
    });

    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('trims whitespace from search term', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setSearch('  ada  ');
    });

    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.filters.search).toBe('  ada  '); // setSearch doesn't trim, filtering does
  });

  it('updates filters independently', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setSearch('grace');
    });

    expect(result.current.filters.search).toBe('grace');
    expect(result.current.filters.role).toBe('all');

    act(() => {
      result.current.setRole('manager');
    });

    expect(result.current.filters.search).toBe('grace');
    expect(result.current.filters.role).toBe('manager');
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].fullName).toBe('Grace Hopper');
  });

  it('handles empty users array', () => {
    const { result } = renderHook(() => useUserFilters([]));

    expect(result.current.filteredUsers).toHaveLength(0);
    expect(result.current.filters).toEqual({ search: '', role: 'all' });

    act(() => {
      result.current.setSearch('test');
      result.current.setRole('admin');
    });

    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('resets to all when role is set to all', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers));

    act(() => {
      result.current.setRole('admin');
    });

    expect(result.current.filteredUsers).toHaveLength(1);

    act(() => {
      result.current.setRole('all');
    });

    expect(result.current.filteredUsers).toHaveLength(4);
  });
});

