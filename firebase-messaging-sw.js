// Recibe las notificaciones push cuando la web instalada está cerrada.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAcED7HXOFqEfX1vXRpXHMiUvDw_Bk4d_U',
  authDomain: 'familia-agenda-f80ad.firebaseapp.com',
  projectId: 'familia-agenda-f80ad',
  storageBucket: 'familia-agenda-f80ad.firebasestorage.app',
  messagingSenderId: '1042868399595',
  appId: '1:1042868399595:web:ee792d50157beaf168bdae',
});

// Con un mensaje que lleva título y texto, Firebase muestra el aviso solo.
firebase.messaging();
