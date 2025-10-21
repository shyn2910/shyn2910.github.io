// firebase.js (sửa chuẩn)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set, get, child, update, onValue, push } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPqd3bW8OGgzAV08CehKo9LwId8jj7YK0",
  authDomain: "shynapi.firebaseapp.com",
  projectId: "shynapi",
  storageBucket: "shynapi.firebasestorage.app",
  messagingSenderId: "791284121791",
  appId: "1:791284121791:web:41d9a11047018847e8860a",
  measurementId: "G-ZMKBYPVNL4",
  databaseURL: "https://shynapi-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
  app, db, auth, ref, set, get, child, update, onValue, push,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
};
