import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: '/mock/api/getRoleList',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: [
          {
            role: 'admin',
            roleName: '管理员',
          },
          {
            role: 'common',
            roleName: '普通用户',
          },
        ],
      };
    },
  },
] as MockMethod[];
