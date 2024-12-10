'use client';

import apiClient from '@/utils/api';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
  role: '',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface LoggedInUser {
  email: string;
  role: 'regulatoryBody' | 'instution';
  instutionId?: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request
    try {
      const userDetail = await apiClient.post(`/users/login?email=${email}&password=${password}`);
      if (userDetail.data.message === 'Login successful') {
        if (userDetail.data.uid) {
          let loggedInUser: LoggedInUser = {
            email: email,
            role: userDetail.data.role,
            instutionId: userDetail.data.uid,
          };
          const token = generateToken();
          localStorage.setItem('custom-auth-token', token);
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        } else {
          let loggedInUser: LoggedInUser = {
            email: email,
            role: userDetail.data.role,
          };
          const token = generateToken();
          localStorage.setItem('custom-auth-token', token);
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        }
      } else {
        return { error: 'Invalid credentials' };
      }
    } catch (error) {
      return { error: 'Invalid credentials' };
    }
    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');
    const useDetail = localStorage.getItem('loggedInUser');
    if (!token) {
      return { data: null };
    }
    if (useDetail) {
      const user: User = JSON.parse(useDetail);

      // Ensure the parsed object contains the expected fields
      if (!user?.email || !user?.role) {
        return { data: null, error: 'Invalid user details in storage' };
      }

      return { data: user };
    }
    // Parse the user details from JSON
    return { data: null };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('loggedInUser');

    return {};
  }
}

export const authClient = new AuthClient();
