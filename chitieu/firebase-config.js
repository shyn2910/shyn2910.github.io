// Firebase config — Thay thông tin thật từ Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD5sSqWNPeKRI-TYGWaJ2CHJgVhK9NEeRA",
  authDomain: "shynsuite.firebaseapp.com",
  databaseURL: "https://shynsuite-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shynsuite",
  storageBucket: "shynsuite.firebasestorage.app",
  messagingSenderId: "555918093845",
  appId: "1:555918093845:web:6784e7cc838398fd9c281c",
  measurementId: "G-MF5CY14YZM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
