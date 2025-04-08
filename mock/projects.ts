import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: '/mock/api/projects',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: [
          {
            id: 1,
            name: '项目1',
            desc: '项目1描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目2',
            desc: '项目2描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目3',
            desc: '项目3描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目4',
            desc: '项目4描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目5',
            desc: '项目5描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目6',
            desc: '项目6描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目7',
            desc: '项目7描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
          {
            id: 1,
            name: '项目8',
            desc: '项目8描述',
            status: 1,
            createTime: '2021-01-01',
            updateTime: '2021-01-01',
          },
        ],
      };
    },
  },
] as MockMethod[];
