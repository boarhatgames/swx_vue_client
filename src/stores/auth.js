import { defineStore } from 'pinia';
import axios from 'axios';
import {useUserStore} from '@/stores/user.js';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => 
    JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
      email: null,
      isLoggedIn: false,
      token: null,
    },
  actions: {

    updateState(data)
    {
      let newAuthState = {...this.$state, ...data}
      localStorage.removeItem('AUTH_STATE');
      localStorage.setItem('AUTH_STATE', JSON.stringify(newAuthState));
      this.$reset();
    },

    async login({ email, password }) {
      const user = useUserStore();
      try {
        const { data } = await axios.post('/api/auth/login', {
          email,
          password,
        });
        this.updateState({email:data.email, isLoggedIn: true, token: data.api });
        await user.storeInfo();  

      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    async logout() {
      const user = useUserStore();
      const router = useRouter();
      localStorage.clear();
      this.$reset();
      user.$reset();
      try {
        await axios.post('/api/logout');
        await router.push({ name: 'login' });
      }
      catch (error) {
        window.location.pathname = '/login';
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
    // async fetchAuthUser() {
    //   try {
    //     const { data } = await axios.get('/api/user/me');
    //     this.authUser = data;
    //     commit('setAuthUser', data);
    //   } catch (e) {
    //     // Not authenticated
    //   }
    // },
  },
});
