import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDputrp6Pcf3aoUaTfhJ6FxLLwhF3H1v5g",
	authDomain: "happy-foodie-8211a.firebaseapp.com",
	projectId: "happy-foodie-8211a",
	storageBucket: "happy-foodie-8211a.appspot.com",
	messagingSenderId: "112051757528",
	appId: "1:112051757528:web:24b29614367faf3794d2ad",
	measurementId: "G-PW92CZ4QWQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);