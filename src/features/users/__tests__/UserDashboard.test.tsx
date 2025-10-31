import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import axios from 'axios';
import { UserDashboard } from '../components/UserDashboard';
import { renderWithProviders } from '../../../test/test-utils';

vi.mock('axios');

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
    image: 'https://example.com/ada.png'
  },
  {
    id: 2,
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'grace@example.com',
    role: 'manager',
    image: 'https://example.com/grace.png'
  },
  {
    id: 3,
    firstName: 'Alan',
    lastName: 'Turing',
    email: 'alan@example.com',
    role: 'viewer',
    image: 'https://example.com/alan.png'
  }
];

function setupAxios(users = mockUsers) {
  mockedAxios.get = vi.fn().mockResolvedValue({ data: { users } });
}

describe('UserDashboard', () => {
  beforeEach(() => {
    setupAxios();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the fetched users', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ada lovelace/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /grace hopper/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alan turing/i })).toBeInTheDocument();
  });

  it('filters users by role', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /ada lovelace/i }));

    fireEvent.click(screen.getByRole('button', { name: /manager/i }));

    expect(screen.getByRole('button', { name: /grace hopper/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ada lovelace/i })).not.toBeInTheDocument();
  });

  it('filters users by search term', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /ada lovelace/i }));

    const searchBox = screen.getByPlaceholderText(/search teammates/i);
    fireEvent.change(searchBox, { target: { value: 'Alan' } });

    expect(screen.getByRole('button', { name: /alan turing/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ada lovelace/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /grace hopper/i })).not.toBeInTheDocument();
  });

  it('shows empty state when no users match filters', async () => {
    renderWithProviders(<UserDashboard />);

    await waitFor(() => screen.getByRole('button', { name: /ada lovelace/i }));

    fireEvent.change(screen.getByPlaceholderText(/search teammates/i), {
      target: { value: 'zzz' }
    });

    expect(screen.getByText(/no users match your filters/i)).toBeInTheDocument();
  });
});
