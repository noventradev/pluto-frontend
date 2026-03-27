import { AxiosInstance } from 'axios';

export function attachInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(
    (config) => {
      //1. Auth token
      const token = localStorage.getItem('userId');
      if (!token) throw new Error('No user');
      config.headers['user-id'] = token; // ← replaces your manual header

      //2. Log outgoing reqs in dev
      if (process.env.NODE_ENV === 'development') {
        console.log(`→ [${config.method?.toUpperCase()}] ${config.url}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE INTERCEPTORS
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
          //   const newToken = await refreshAccessToken();
          //   original.headers.Authorization = `Bearer ${newToken}`;
          //   return client(original); // retry original request
        } catch {
          // redirect to login
          window.location.href = '/login';
        }
      }
      return Promise.reject({
        status: error.response?.status,
        message: error.response?.data?.message || 'Something went wrong',
        data: error.response?.data,
      });
    }
  );
}
