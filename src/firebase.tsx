import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcsHry0Sgkpu4fYGRz59ZysouX0Agc2Ng",
  authDomain: "mydiplomapp-e5ebf.firebaseapp.com",
  projectId: "mydiplomapp-e5ebf",
  storageBucket: "mydiplomapp-e5ebf.appspot.com",
  messagingSenderId: "1071633339957",
  appId: "1:1071633339957:web:3dea3199defe1904ef437c",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
