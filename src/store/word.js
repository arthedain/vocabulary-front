import { defineStore } from 'pinia';
import axios from 'axios';

export const useWordStore = defineStore({
  id: 'word',
  state: () => ({
    list: [],
    result: [],
    results: {
      list: {}
    },
    words: [],
  }),
  actions: {
    async fetchRandomWords(count = 4) {
      const { data } = await axios.get(`${import.meta.env.VITE_API_HOST}/api/vocabulary/random/${count}`, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      });
      this.list = data;
    },
    async saveQuizAnswer(questionId, answerId, hash) {
      await axios.post(`${import.meta.env.VITE_API_HOST}/api/vocabulary/save-answer`, {
        'type': 'eng-ua',
        'question_id': questionId,
        'answer_id': answerId,
        hash
      }, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      });
    },
    async fetchResult(hash) {
      const { data } = await axios.get(`${import.meta.env.VITE_API_HOST}/api/vocabulary/result/`+hash, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      });
      this.result = data;
    },
    async fetchResults() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_HOST}/api/vocabulary/results/`, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      });
      this.results = data;
    },
    async getAll(page = 1, search = '') {
      const {data} = await axios.get(`${import.meta.env.VITE_API_HOST}/api/vocabulary`, {
        params: {
          page,
          search
        },
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      });
      this.words = data
    },
    async create(data) {
      await axios.post(`${import.meta.env.VITE_API_HOST}/api/vocabulary/create`, {...data}, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      })
    },
    async update(id, data) {
      await axios.post(`${import.meta.env.VITE_API_HOST}/api/vocabulary/update/${id}`, {...data}, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      })
    },
    async delete(id) {
      await axios.post(`${import.meta.env.VITE_API_HOST}/api/vocabulary/delete/${id}`, {}, {
        headers: {
          'token': localStorage.getItem('access_token'),
          "Access-Control-Allow-Origin": "*",
          "localtonet-skip-warning": true

        }
      })
    },
  },
});
