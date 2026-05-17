import { AxiosInstance } from 'axios';

const TOKEN_KEY = 'pluto_token';

export function attachInterceptors(client: AxiosInstance) {
  // REQUEST: Attach JWT token automatically
  client.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`→ [${config.method?.toUpperCase()}] ${config.url}`);
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // RESPONSE: Handle 401 with auto logout + redirect
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('pluto_user');
        window.location.href = '/sign-in';
      }

      return Promise.reject({
        status: error.response?.status,
        message: error.response?.data?.message || 'Something went wrong',
        data: error.response?.data,
      });
    },
  );
}
