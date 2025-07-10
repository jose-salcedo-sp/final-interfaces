import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPEOXkzuJ9BXEOoVFpg8iKqowyar_kp6o",
  authDomain: "upchat-bc02f.firebaseapp.com",
  databaseURL: "https://upchat-bc02f-default-rtdb.firebaseio.com",
  projectId: "upchat-bc02f",
  storageBucket: "upchat-bc02f.firebasestorage.app",
  messagingSenderId: "11528119055",
  appId: "1:11528119055:web:017478470a9b2dc564d47a"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
