import { defineStore } from "pinia";
import axios from 'axios';

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        users: [],
    }),
    actions: {
        async all(page, search) {
            const { data } = await axios.get(`${import.meta.env.VITE_API_HOST}/api/user`, {
                params: {
                    page,
                    search
                },
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'token': localStorage.getItem('access_token'),
                }
            });
            this.users = data;
        },
        async create(data) {
            await axios.post(`${import.meta.env.VITE_API_HOST}/api/user/create`, {...data}, {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'token': localStorage.getItem('access_token'),
                }
            });
        },
        async update(id, data) {
            await axios.post(`${import.meta.env.VITE_API_HOST}/api/user/update/${id}`, {...data}, {
              headers: {
                'token': localStorage.getItem('access_token'),
                "Access-Control-Allow-Origin": "*",
                "localtonet-skip-warning": true
      
              }
            })
          },
          async delete(id) {
            await axios.post(`${import.meta.env.VITE_API_HOST}/api/user/delete/${id}`, {}, {
              headers: {
                'token': localStorage.getItem('access_token'),
                "Access-Control-Allow-Origin": "*",
                "localtonet-skip-warning": true
      
              }
            })
          },
    }
});