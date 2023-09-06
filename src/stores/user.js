import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    JSON.parse(localStorage.getItem('USER_INFO')) ?? {
      id: null,
      aid: null,
      email: null,
      name: '',
      // ADD more stuff
    },
  actions: {
    updateState(data) {
      let newUserInfo = { ...this.$state, ...data };
      localStorage.removeItem('USER_INFO');
      localStorage.setItem('USER_INFO', JSON.stringify(newUserInfo));
      this.$reset();
    },
    async storeInfo() {
      // add bearer token to axios header
      let token = JSON.parse(localStorage.getItem('AUTH_STATE')).token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data: userInfo } = await axios.get('/api/user/me');
      localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
      this.$reset();
    },
  },
});
