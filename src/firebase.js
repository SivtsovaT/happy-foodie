import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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
export const db = getFirestore(app);
const storage = getStorage();
export async function upload(file, currentUser, setLoading) {
	const fileRef = ref(storage, currentUser.uid + '.png');

	setLoading(true);

	const snapshot = await uploadBytes(fileRef, file);
	const photoURL = await getDownloadURL(fileRef);

	updateProfile(currentUser, {photoURL});

	setLoading(false);
	alert("Uploaded file!");
}

export default app;