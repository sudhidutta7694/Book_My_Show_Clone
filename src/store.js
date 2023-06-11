import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export const useStore = defineStore('store', {
  state: () => ({
    username: '',
    uid: '',
  }),
  actions: {
    async setUsername(username, uid) {
      this.username = username;
      this.uid = uid;
      const sessionData = { username, uid };

      // Update the username in Firestore
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid);
      await setDoc(userDoc, { username });

      // Set the session data in Firestore
      const sessionDoc = doc(db, 'sessions', uid);
      await setDoc(sessionDoc, sessionData);

      // Store the username in local storage
      localStorage.setItem('username', username);
    },
    async clearUsername() {
      this.username = '';
      this.uid = '';

      // Remove the session data from Firestore
      const db = getFirestore();
      const sessionDoc = doc(db, 'sessions', this.uid);
      await deleteDoc(sessionDoc);
    },
    async initializeSession() {
      const db = getFirestore();
      const sessionDoc = doc(db, 'sessions', this.uid);
      const sessionSnapshot = await getDoc(sessionDoc);

      if (sessionSnapshot.exists()) {
        const sessionData = sessionSnapshot.data();
        this.username = sessionData.username;
        this.uid = sessionData.uid;
      }
    },
  },
  // Initialize the session when the store is created
  // This will ensure the username is set on page reload
  async onInit() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    } else {
      await this.initializeSession();
    }
  },
  // Save session data to localStorage on state change
  onStateChanged() {
    const sessionData = JSON.stringify({ username: this.username, uid: this.uid });
    localStorage.setItem('session', sessionData);
  },
});

