import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    user: {},
  }),
  actions: {
    async login(email, password) {
        const { data } = await axios.post(`${import.meta.env.VITE_API_HOST}/api/auth/login/`, {email, password}, {
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        });
        if(data.access_token) {
          this.saveToken(data.access_token);
        }
    },
    async register(name, email, password) {
      const {data} = await axios.post(`${import.meta.env.VITE_API_HOST}/api/auth/registration/`, {name, email, password}, {
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      });

      if(data.access_token) {
        this.saveToken(data.access_token);
      }
    },
    saveToken(token) {
      localStorage.setItem('access_token', token);
    },
    getToken() {
      return localStorage.access_token;
    },
    isAuth() {
      if(!!localStorage.access_token) {
        this.token = localStorage.access_token;
      }

      return !!this.token;
    },
    async getUser() {
      const {data} = await axios.get(`${import.meta.env.VITE_API_HOST}/api/auth/user/`, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });

      if(data) {
        this.user = data;
      }
    },
    logout() {
      this.token = '';
      this.user = {};
      localStorage.removeItem('access_token');
    }
  },
});
