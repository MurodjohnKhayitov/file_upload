import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAPvO0RtYs3HyR3jakjdzgtDHwSNpwTuKU",
    authDomain: "shopping-e9b14.firebaseapp.com",
    projectId: "shopping-e9b14",
    storageBucket: "shopping-e9b14.appspot.com",
    messagingSenderId: "605190479987",
    appId: "1:605190479987:web:85e905f5fd89a26fcd0a06",
    measurementId: "G-B2DTTW3ZSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app