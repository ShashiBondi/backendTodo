import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3UaJF9qfOMpxRHMJto8jD8csPWPu5i0M",
  authDomain: "todo-8696e.firebaseapp.com",
  projectId: "todo-8696e",
  storageBucket: "todo-8696e.appspot.com",
  messagingSenderId: "1091605312137",
  appId: "1:1091605312137:web:24c6f3c7f97d06ff810c58",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
