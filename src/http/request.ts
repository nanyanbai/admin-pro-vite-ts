import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { getMessageInfo } from './status';
import { ElMessage } from 'element-plus';

import type { BaseResponse } from './types';

// 创建请求实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_USE_MOCK
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: 'error',
    });
    return response;
  },
  // 请求失败
  (err: AxiosError) => {
    const { response } = err;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      ElMessage({
        message: getMessageInfo(response.status),
        type: 'error',
      });
      return Promise.reject(response.data);
    }
    ElMessage({
      message: '网络异常,请稍后再试!',
      type: 'error',
    });
  },
);

// 二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
      const data = res.data;
      // 如果data.code为错误代码返回message信息
      if (data.code != 1) {
        ElMessage({
          message: data.message,
          type: 'error',
        });
        reject(data.message);
      } else {
        ElMessage({
          message: data.message,
          type: 'success',
        });
        // 此处返回data信息 也就是 api 中配置好的 Response类型
        resolve(data.data as T);
      }
    });
  });
};

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'PUT', params: parms });
}

export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

// 导出service
// export default service;
