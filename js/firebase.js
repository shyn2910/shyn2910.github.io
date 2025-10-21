// js/firebase.js
// Firebase config của bạn (shyn-app-0709)
const firebaseConfig = {
  apiKey: "AIzaSyD9XW1A1ns5cYlV3bI5i4HigR9HyUUYlvQ",
  authDomain: "shyn-app-0709.firebaseapp.com",
  databaseURL: "https://shyn-app-0709-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shyn-app-0709",
  storageBucket: "shyn-app-0709.firebasestorage.app",
  messagingSenderId: "660274057745",
  appId: "1:660274057745:web:99bbcbb069823708d9d7b0",
  measurementId: "G-SBNLHSB8PZ"
};

// Initialize Firebase
window._app = firebase.initializeApp(firebaseConfig);
window._auth = firebase.auth();
window._db = firebase.database();
