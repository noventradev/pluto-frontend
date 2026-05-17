import { api } from './api/client';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  LoginResponseData,
  AuthUser,
} from '@/app/lib/types/auth.types';

export const AuthService = {
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse<LoginResponseData>>('/auth/login', data),

  logout: () =>
    api.post<AuthResponse>('/auth/logout', {}),

  getProfile: () =>
    api.get<AuthResponse<AuthUser>>('/auth/profile'),
};
