// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmr01LK5BasMbr1JWcmq_Tgfh_ZyN9kn0",
  authDomain: "dilhariya.firebaseapp.com",
  projectId: "dilhariya",
  storageBucket: "dilhariya.firebasestorage.app",
  messagingSenderId: "897258501207",
  appId: "1:897258501207:web:85c3f61bcb1a6ce9739f12",
  measurementId: "G-28F6V6W98E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      console.log(permission);
    }
  });
}

function postToken(token) {
  const url =
    "https://script.google.com/macros/s/AKfycbypxN13MNpfiWDlhoaIT7w_kja3r20eBYjZJCX9RX9dGsVKe-vFIIO9uITkiRKP1BxA/exec";

  const data = {
    token: token,
    userAgent: navigator.userAgent,
  };
  $.post(url, data).done((response) => {
    console.log(response);
  });
}

const token = await getToken(messaging, {
  vapidKey:
    "BBgRhk1T4L5otIVjzb-YleYWih6prGsI-Lm8U14ySe52bNXaFAOQ_iN6uGvweNg4Rlw62I-Esa53-gR9Ljn_ErI",
});

if (token) {
  console.log("Received firebase messaging token: ", token);
  postToken(token);
} else {
  requestPermission();
}

onMessage(messaging, (payload) => {
  console.log("Message received: " + JSON.stringify(payload));
  notifyInWebPage(
    payload["notification"]["title"],
    payload["notification"]["body"],
  );
});
