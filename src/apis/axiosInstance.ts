import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import set from "lodash/set";
import get from "lodash/get";

import { getCookie } from "@/ultils/cookies";
import { CookieKeys } from "@/constant/services";
import { ACCESS_TOKEN } from "@/constant/auth-name";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: baseUrl,
  timeout: 20000,
  validateStatus: function (status: number) {
    return status >= 200 && status < 300;
  },
});

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    const token = getCookie(ACCESS_TOKEN);
    if (!token) {
      return request;
    }
    set(request, "headers.Authorization", `Bearer ${token}`);
    return request;
  },
  (_error: any) => {
    console.log(
      "🚀 ~ axiosInstance.interceptors.request.use ~ _error:",
      _error
    );
    const errorResponse = {
      status: null,
      message: null,
      errors: null,
    };
    return Promise.reject(errorResponse);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorResponse = {
      status: get(error, "response.status", null),
      message: get(error, "response.data.message", null),
      errors: get(error, "response.data.errors", null),
    };
    return Promise.reject(errorResponse);
  }
);

export default axiosInstance;
