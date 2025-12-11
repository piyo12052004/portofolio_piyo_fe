import axios from "axios";
import { useToaster } from './toats/toaster.ts';

const successCodes = ['200', '201', '202', '203', '204'];
let isRefreshing = false;
let failedQueue: any[] = [];
let baseUrl = import.meta.env.VITE_API_URL;
const handleResponse = (response: any) => {
  return response;
};
const processQueue = (error: any, token: string | null | undefined = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
export const createApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => handleResponse(response),

    async (error) => {
      const originalRequest = error.config;

      // JIKA TOKEN EXPIRED (401)
      if (error.response?.status === 401 && !originalRequest._retry) {

        // Jika sudah ada proses refresh → masuk antrian
        if (isRefreshing && !originalRequest._retry) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
          .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const expiredToken = localStorage.getItem("token");

          const { data } = await axios.post(
            `${baseUrl}/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${expiredToken}`,
              },
            }
          );

          const newToken = data.data.access_token;

          // Simpan token baru
          localStorage.setItem("token", newToken);
          // const userSession = useUserSession();
          // userSession.setToken(newToken);

          // Lepas antrean
          processQueue(null, newToken);

          // Update header
          // originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          return api(originalRequest);

        } catch (err) {
          processQueue(err, null);
          // await logout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // Error lain tetap jalan
      return Promise.reject(error);
    }
  );
  return api;
};

export const useApi = () => {
  const apiInstance = createApi();
  // const toaster = useToaster()
  return {
    get: (url: string, params?: any) => apiInstance.get(url, { params }).then((res) => {
      return handleAllResponse(res, undefined, true)
    }),
    post: (url: string, data: any, message?: string) => apiInstance.post(url, data).then((res) => {
      return handleAllResponse(res, message);
    }),
    put: (url: string, data: any, message?: string) => apiInstance.put(url, data).then((res) => {
      return handleAllResponse(res, message);
    }),
    patch: (url: string, data: any, message?: string) => apiInstance.patch(url, data).then((res) => {
      return handleAllResponse(res, message);
    }),
    delete: (url: string, message?: string) => apiInstance.delete(url).then((res) => handleAllResponse(res, message)),
    postNoMessage: (url: string, data: any) => apiInstance.post(url, data).then((res) => res.data),
    putNoMessage: (url: string, data: any) => apiInstance.put(url, data).then((res) => res.data),
    patchNoMessage: (url: string, data: any) => apiInstance.patch(url, data).then((res) => res.data),
    deleteNoMessage: (url: string) => apiInstance.delete(url).then((res) => res.data),
  };
};

const handleAllResponse = (response: any, message?: string, skipMessage?: boolean) => {
  const responseMessage = response.data?.message || 'Success';
  const toaster = useToaster()
  const successMessage = message || adjustSuccessMessage(responseMessage) || 'Success';
  if (!skipMessage) {
    if (successCodes.includes(response.data.rc)) {
      toaster.success(successMessage);
    }
  }
  return response.data;
};

const adjustSuccessMessage = (message: string) => {
  switch (message) {
    case 'Successfully':
    case 'Successfully Create':
    case 'Successfully Update':
    case 'Successfully Delete':
      return 'Sukses';
    default:
      return message;
  }
};
