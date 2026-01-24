// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYnARkdYt_AXurVih8EYke7J6jGVHpN0Y",
  authDomain: "shahiway-34fa9.firebaseapp.com",
  projectId: "shahiway-34fa9",
  storageBucket: "shahiway-34fa9.firebasestorage.app",
  messagingSenderId: "30636712910",
  appId: "1:30636712910:web:5bd92963ffdc0a9477819f",
  measurementId: "G-GKYJBYD4Y7"
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
    "https://script.google.com/macros/s/AKfycbwZOUj5iDN9pNzjFhLLtQS2KsKjCeVI_DVlJ1wzTX2HjFAyABW3ystqOgaps2exyogWMQ/exec";

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
    "BK9lyNMs6YsFN8Ep7cotrCdNy_SJEIM5oyXzag5652X2tH-nV7b9xUfIbUk-AlC0PCil-zVB6ol3Ottfv7vdj6M",
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
