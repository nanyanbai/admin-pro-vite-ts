import { get, post } from '@/http/request';
import type { LoginRequest, LoginResponse, reLoginRequest } from './types';

// 登录接口
export const userLogin = async (data?: LoginRequest) => {
  return post<LoginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
  return post<LoginResponse>({}, '/getUserInfo', data);
};

export const getUserList = async () => {
  return get({}, '/getUserList');
};
