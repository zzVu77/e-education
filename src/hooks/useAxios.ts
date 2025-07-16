import axiosInstance from "@/config/axiosConfig";
import axios, { type AxiosRequestConfig, type Method } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

interface FetchDataOptions<TData = unknown> {
  url: string;
  method?: Method;
  data?: TData;
  timeout?: number;
  params?: Record<string, string | number>;
  config?: AxiosRequestConfig<TData>;
}

const useAxios = <TResponse = unknown>() => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async <TData = unknown>({
      url,
      method = "GET",
      data,
      params,
      config,
      timeout = 500,
    }: FetchDataOptions<TData>): Promise<void> => {
      setLoading(true);
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const result = await axiosInstance.request<TResponse>({
          url,
          method,
          data,
          params,
          signal: controller.signal,
          ...config,
        });

        setTimeout(() => {
          setResponse(result.data);
          setLoading(false);
        }, timeout); // Use timeout if provided, otherwise default to 0
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("API error:", err);
        }
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return {
    response,
    loading,
    fetchData,
    setResponse,
  };
};

export default useAxios;
