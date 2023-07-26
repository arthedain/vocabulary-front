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
      const { data } = await axios.get(`${process.env.API_HOST}/api/vocabulary/random/${count}`, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });
      this.list = data;
    },
    async saveQuizAnswer(questionId, answerId, hash) {
      await axios.post(`${process.env.API_HOST}/api/vocabulary/save-answer`, {
        'type': 'eng-ua',
        'question_id': questionId,
        'answer_id': answerId,
        hash
      }, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });
    },
    async fetchResult(hash) {
      const { data } = await axios.get(`${process.env.API_HOST}/api/vocabulary/result/`+hash, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });
      this.result = data;
    },
    async fetchResults() {
      const { data } = await axios.get(`${process.env.API_HOST}/api/vocabulary/results/`, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });
      this.results = data;
    },
    async getAll(page = 1, search = '') {
      const {data} = await axios.get(`${process.env.API_HOST}/api/vocabulary`, {
        params: {
          page,
          search
        },
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      });
      this.words = data
    },
    async create(data) {
      await axios.post(`${process.env.API_HOST}/api/vocabulary/create`, {...data}, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      })
    },
    async update(id, data) {
      await axios.post(`${process.env.API_HOST}/api/vocabulary/update/${id}`, {...data}, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      })
    },
    async delete(id) {
      await axios.post(`${process.env.API_HOST}/api/vocabulary/delete/${id}`, {}, {
        headers: {
          'token': localStorage.getItem('access_token'),
        }
      })
    },
  },
});
