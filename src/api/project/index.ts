import { get } from '@/http/request';

// 登录接口
export const getProjectList = async (data?: any) => {
  return get({}, '/projects', data);
};
