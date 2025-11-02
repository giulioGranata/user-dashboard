import * as userService from '@/features/users/api/userService';
import { UserDashboard } from '@/features/users/components/UserDashboard';
import { renderWithProviders } from '@/test/test-utils';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import type { Mock } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('axios');
vi.mock('@/features/users/api/userService');

const mockedAxios = axios as unknown as {
  get: Mock;
};

const mockUsers = [
  {
    id: 1,
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    role: 'admin',
    image: 'https://example.com/ada.png',
  },
  {
    id: 2,
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'grace@example.com',
    role: 'moderator',
    image: 'https://example.com/grace.png',
  },
  {
    id: 3,
    firstName: 'Alan',
    lastName: 'Turing',
    email: 'alan@example.com',
    role: 'user',
    image: 'https://example.com/alan.png',
  },
];

function setupAxios(users = mockUsers) {
  mockedAxios.get = vi.fn().mockResolvedValue({
    data: {
      users,
      total: users.length,
      skip: 0,
      limit: 20,
    },
  });
}

function setupUserService(users = mockUsers) {
  const normalizedUsers = users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    role: user.role as 'admin' | 'moderator' | 'user',
    avatarUrl: user.image || `https://picsum.photos/seed/${user.firstName.toLowerCase()}/128`,
    phone: 'N/A',
    location: 'Remote',
  }));

  vi.mocked(userService.fetchUsers).mockImplementation((params) => {
    let filteredUsers = normalizedUsers;

    // Apply role filtering
    if (params?.role && params.role !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.role === params.role);
    }

    // Apply search filtering
    if (params?.search && params.search.length >= 3) {
      const searchLower = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        user.fullName.toLowerCase().includes(searchLower),
      );
    }

    return Promise.resolve({
      users: filteredUsers,
      total: filteredUsers.length,
      skip: params?.skip ?? 0,
      limit: params?.limit ?? 20,
    });
  });
}

describe('UserDashboard', () => {
  beforeEach(() => {
    setupAxios();
    setupUserService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the fetched users', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /view details for ada lovelace/i }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole('button', { name: /view details for grace hopper/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /view details for alan turing/i }),
    ).toBeInTheDocument();
  });

  it('filters users by role', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /moderator/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /view details for grace hopper/i }),
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByRole('button', { name: /view details for ada lovelace/i }),
    ).not.toBeInTheDocument();
  });

  it('filters users by search term', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    const searchBox = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchBox, { target: { value: 'Alan' } });

    await waitFor(
      () => {
        expect(
          screen.getByRole('button', { name: /view details for alan turing/i }),
        ).toBeInTheDocument();
        expect(
          screen.queryByRole('button', { name: /view details for ada lovelace/i }),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole('button', { name: /view details for grace hopper/i }),
        ).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('shows empty state when no users match filters', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.change(screen.getByPlaceholderText(/search users/i), {
      target: { value: 'zzz' },
    });

    await waitFor(
      () => {
        expect(screen.getByText(/no users match your filters/i)).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('shows loading state while fetching users', () => {
    vi.mocked(userService.fetchUsers).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    renderWithProviders(<UserDashboard />);

    expect(screen.getByText(/Loading users/i)).toBeInTheDocument();
  });

  it('shows error state when fetch fails', async () => {
    vi.mocked(userService.fetchUsers).mockRejectedValue(new Error('Network error'));

    renderWithProviders(<UserDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/we could not load the users/i)).toBeInTheDocument();
    expect(screen.getByText(/please check your connection and try again/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry loading users/i })).toBeInTheDocument();
  });

  it('retries fetch when retry button is clicked', async () => {
    const normalizedUsers = mockUsers.map((user) => ({
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      role: user.role as 'admin' | 'moderator' | 'user',
      avatarUrl: user.image || `https://picsum.photos/seed/${user.firstName.toLowerCase()}/128`,
      phone: 'N/A',
      location: 'Remote',
    }));

    vi.mocked(userService.fetchUsers)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        users: normalizedUsers,
        total: normalizedUsers.length,
        skip: 0,
        limit: 20,
      });

    renderWithProviders(<UserDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry loading users/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /retry loading users/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /view details for ada lovelace/i }),
      ).toBeInTheDocument();
    });
  });

  it('opens modal when a user is clicked', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /view details for ada lovelace/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Check content inside modal using within()
    const modalContent = within(modal);
    expect(modalContent.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(modalContent.getByText('ada@example.com')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /view details for ada lovelace/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close user details/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes modal when Escape key is pressed', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /view details for ada lovelace/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes modal when clicking backdrop', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /view details for ada lovelace/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click on the backdrop (the element with role="presentation")
    const backdrop = document.querySelector('[role="presentation"]');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes modal when selected user is filtered out', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /view details for ada lovelace/i }));

    // Open modal for Ada
    fireEvent.click(screen.getByRole('button', { name: /view details for ada lovelace/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Filter to only show moderators (Grace, not Ada)
    fireEvent.click(screen.getByRole('button', { name: /moderator/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
