import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername(username) {
      this.username = username
    },
  },
})
