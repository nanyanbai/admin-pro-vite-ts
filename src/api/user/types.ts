// 登录请求参数
export type LoginRequest = {
  username: string;
  password: string;
};

// 刷新登录信息参数
export type reLoginRequest = {
  accessToken: string;
};

// 登录响应信息
export type LoginResponse = {
  username: string;
  roles: string[];
  accessToken: string;
};

// 用户列表
export interface IUser {
  id: number;
  username: string;
  password: string;
  roles: string[];
  createTime: string;
  updateTime: string;
}
