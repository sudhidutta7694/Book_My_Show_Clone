import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername(username) {
      this.username = username;
      localStorage.setItem('session', JSON.stringify({ username }));
    },
    clearUsername() {
      this.username = '';
      localStorage.removeItem('session');
    },
    initializeSession() {
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        const { username } = JSON.parse(sessionData);
        this.username = username;
      }
    },
  },
  // Initialize the session when the store is created
  // This will ensure the username is set on page reload
  created() {
    this.initializeSession();
  },
});
