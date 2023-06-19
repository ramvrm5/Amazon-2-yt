import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    authDomain: "amzn-2-yt-83194.firebaseapp.com",
    apiKey: "AIzaSyAKPAIkpsSug3sKplk-KcaUDbzn6OscR3s",
    projectId: "amzn-2-yt-83194",
    appId: "1:25430860223:web:9b4647b87497b71252810a",
    storageBucket: "amzn-2-yt-83194.appspot.com",
    messagingSenderId: "25430860223",
};

// Check if Firebase app is already initialized
// const app = getApp();
// if (!app) {
//   // Initialize Firebase app
//   initializeApp(firebaseConfig);
// }

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;