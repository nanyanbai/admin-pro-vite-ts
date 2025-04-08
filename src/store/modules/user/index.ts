import { defineStore } from 'pinia';
import type { IUserState } from '@/store/modules/user/types';
import type { LoginRequest } from '@/api/user/types';
import { userLogin, refreshUserInfo } from '@/api/user';

export const useUserStore = defineStore('User', {
  state: (): IUserState => ({
    username: 'yk',
    accessToken: '',
    roles: ['common'],
  }),
  getters: {},
  actions: {
    // 更新state数据
    storeUpdateInfo(partial: Partial<IUserState>) {
      this.$patch(partial);
    },
    // 登录
    async storeUserLogin(data?: LoginRequest) {
      return userLogin(data).then((res) => {
        this.username = res.username;
        this.roles = res.roles;
        this.accessToken = res.accessToken;
        return res;
      });
    },
    // 刷新用户信息
    async storeRefreshUserInfo() {
      return (
        this.accessToken &&
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username;
            this.roles = res.roles;
            this.accessToken = res.accessToken;
          })
          .catch(() => {
            this.accessToken = '';
          })
      );
    },
  },
  // 持久化存储 accessToken
  persist: {
    key: 'userInfo', // 用于引用storage中的数据的键名，默认值为store的$id。可以自定义键名以避免命名冲突。
    storage: sessionStorage, // 指定数据持久化的存储介质，默认值为localStorage，也可以设置为sessionStorage。
    pick: ['accessToken'], // 指定哪些数据需要被持久化，空数组表示不持久化任何状态，undefined或null表示持久化整个state。
    // serializer: {
    //   serialize() {},
    //   deserialize() {},
    // }, // 自定义序列化方法，默认值为JSON.stringify和JSON.parse。可以自定义序列化函数以适应复杂数据类型。
  },
});
