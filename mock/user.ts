import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: '/mock/api/login',
    method: 'post',
    response: ({ body }) => {
      // 用户名不等于密码就是密码错误
      if (body.username !== body.password) {
        // 返回JSON信息
        return {
          code: 0,
          message: '密码错误',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        };
      }
      // 其余的则显示登录成功
      if (body.username === 'admin') {
        return {
          code: 1,
          message: '登录成功',
          data: {
            username: 'admin',
            roles: ['admin'],
            accessToken: 'admin',
          },
        };
      } else {
        return {
          code: 1,
          message: '登录成功',
          data: {
            username: 'common',
            roles: ['common'],
            accessToken: 'common',
          },
        };
      }
    },
  },
  {
    url: '/mock/api/getUserList',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: [
          {
            id: 1,
            username: 'admin',
            password: '123456',
            roles: ['admin', 'common'],
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 2,
            username: 'zhangsan',
            password: '123456',
            roles: ['common'],
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 3,
            username: 'lisi',
            password: '123456',
            roles: ['common'],
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
        ],
      };
    },
  },
] as MockMethod[];
