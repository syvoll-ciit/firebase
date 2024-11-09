import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9nwjVT7tFf1-q9ljuLRG6b1IkzUPrZhY",
  authDomain: "reactdemo-40300.firebaseapp.com",
  projectId: "reactdemo-40300",
  storageBucket: "reactdemo-40300.firebasestorage.app",
  messagingSenderId: "999360920880",
  appId: "1:999360920880:web:a80eafb371e38e00f9dcf5"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}