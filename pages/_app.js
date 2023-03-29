import '@/styles/globals.css';
import '@/styles/Home.module.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAk8pGEwSHue8TFuFaTVqHKGavvPh9Lv_s",
  authDomain: "cloudauth00.firebaseapp.com",
  projectId: "cloudauth00",
  storageBucket: "cloudauth00.appspot.com",
  messagingSenderId: "63355610177",
  appId: "1:63355610177:web:9127ea94a08b6910b0d2c0",
  measurementId: "G-XZ56D8JXWP"
};

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
