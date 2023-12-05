importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
 
firebase.initializeApp({
    "apiKey": "AIzaSyDaqSdDJes5UUBYaTUC7XjfDiDPurIvWwY",
    "authDomain": "tavinho-328718.firebaseapp.com",
    "projectId": "tavinho-328718",
    "storageBucket": "tavinho-328718.appspot.com",
    "messagingSenderId": "972294788553",
    "appId": "1:972294788553:web:0490b0642d9c73f7cac418",
    "measurementId": "G-S38Z06SJKF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });