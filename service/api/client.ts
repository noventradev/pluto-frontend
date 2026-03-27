import axios from 'axios';
import { attachInterceptors } from './interceptors';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

attachInterceptors(apiClient);

export default apiClient;

// REQUEST CLIENTS
export const api = {
  get: <T>(url: string, params?: object) =>
    apiClient.get<T>(url, { params }).then((r) => r.data),

  post: <T>(url: string, body: unknown) =>
    apiClient.post<T>(url, body).then((r) => r.data),

  put: <T>(url: string, body: unknown) =>
    apiClient.put<T>(url, body).then((r) => r.data),

  patch: <T>(url: string, body: Partial<unknown>) =>
    apiClient.patch<T>(url, body).then((r) => r.data),

  delete: <T>(url: string) => apiClient.delete<T>(url).then((r) => r.data),
};
