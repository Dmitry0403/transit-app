import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your Firebase web app config
// Consider moving these to env vars and injecting via DefinePlugin
const firebaseConfig = {
    apiKey: "AIzaSyDw4ayGEMU91arEYuI1fUuiR6mhGdeQEog",
    authDomain: "transit-order-sts.firebaseapp.com",
    projectId: "transit-order-sts",
    storageBucket: "transit-order-sts.firebasestorage.app",
    messagingSenderId: "443227230096",
    appId: "1:443227230096:web:878514396f7ec397a22d15",
    measurementId: "G-T8XLV43L1B",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const isFirebaseConfigured = Boolean(
    firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey.length > 0
);
