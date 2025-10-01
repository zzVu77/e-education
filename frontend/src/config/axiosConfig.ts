/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required for refresh token in cookies
});

/* ------------------ Request Interceptor ------------------ */
// Always attach the token if available; otherwise, treat it as a public request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      // Ensure headers are AxiosHeaders to safely use set/concat APIs
      config.headers = AxiosHeaders.from(config.headers);
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ------------------ Response Interceptor ------------------ */
let isRefreshing = false;
let failedQueue: {
  resolve: (token?: string | null) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // If 401 is encountered and the request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress → wait
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers = AxiosHeaders.from(
                originalRequest.headers,
              );
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the refresh token API
        await axiosInstance.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        // Retrieve the new token from cookies (server has already saved the cookie)
        const newAccessToken = Cookies.get("accessToken");
        processQueue(null, newAccessToken);
        if (newAccessToken) {
          originalRequest.headers = AxiosHeaders.from(originalRequest.headers);
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${newAccessToken}`,
          );
        }
        return axiosInstance(originalRequest); // retry the original request
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
