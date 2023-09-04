import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    authUser: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.authUser,
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const { data } = await axios.post('/api/auth/login', {
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
    async logout({ commit }) {
      await axios.post('/api/logout');
      commit('setAuthUser', null);
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
    async fetchAuthUser() {
      try {
        const { data } = await axios.get('/api/user/me');
        this.authUser = data;
        commit('setAuthUser', data);
      } catch (e) {
        // Not authenticated
      }
    },
  },
  mutations: {
    setAuthUser(state, user) {
      state.authUser = user;
    },
  },
});
