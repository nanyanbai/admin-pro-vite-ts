// 这里是通俗的解释 详情请前往官方文档查阅
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 信息以空格开头
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // 信息最大长度
    'header-max-length': [2, 'always', 108],
    // 信息不能未空
    'subject-empty': [2, 'never'],
    // 信息类型不能未空
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'perf', // 更改代码以提高性能
        'style', // 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
        'docs', // 仅仅修改文档说明
        'test', // 增加新的测试功能或更改原有的测试模块
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'build', // 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）
        'ci', // 对 CI 配置文件和脚本的更改
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚
        'wip', // 开发中
        'workflow', // 工作流
        'types', // 类型定义
        'release', // 发布
        'temp', // 临时的提交
      ],
    ],
  },
};
