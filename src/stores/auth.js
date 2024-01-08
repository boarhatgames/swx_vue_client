import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';
import base64 from 'base-64';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () =>
    JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
      email: null,
      isLoggedIn: false,
      token: null,
      primaryGroupId: null,
      secondaryGroupIds: null,
    },
  actions: {
    updateState(data) {
      let newAuthState = { ...this.$state, ...data };
      localStorage.removeItem('AUTH_STATE');
      localStorage.setItem('AUTH_STATE', JSON.stringify(newAuthState));
      this.$reset();
    },

    async login({ email, password }) {
      const user = useUserStore();
      try {
        let token = base64.encode(`${email}:${password}`);
        const { data } = await axios.post('/api/auth/login', {
          email,
          password,
        },
       // send authorization header to axios
       
        axios.defaults.headers.common['Authorization'] = `Basic ${token}`,

        );
        if (data.success) {
          // this.commit('setAuthUser', data);
          this.updateState({
            email: data.user.email,
            isLoggedIn: true,
            token: data.api,
            primaryGroupId: data.user.primaryGroupId,
            secondaryGroupIds: data.user.secondaryGroupIds,
          });
          await user.storeInfo();
          return true;
        } else throw new Error('Bad credentials');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    async logout() {
      const user = useUserStore();

      try {
        const router = useRouter();
        // add authorization header to axios
        let token = this.$state.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post('/api/auth/logout');
        localStorage.clear();
        this.$reset();
        user.$reset();
        router.push('/login');
      } catch (error) {
        const router = useRouter();

        window.location.href = '/vueLogin#/login';
      }
    },
    async register({ commit }, { username, password }) {
      try {
        const { data } = await axios.post('/api/register', {
          username,
          password,
        });
        commit('setAuthUser', data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
  },

  // getters: {
  //   isLoggedIn: (state) => state.isLoggedIn,
  //   email: (state) => state.email,
  //   token: (state) => state.token,
  // },

  mutations: {
    setAuthUser(state, user) {
      state.authUser = user;
    },
  },
});
