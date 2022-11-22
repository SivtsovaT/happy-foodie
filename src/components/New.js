import React, {useEffect, useState} from "react";
import {auth, db, upload} from "../firebase";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	 doc, query,where
} from "firebase/firestore";

const New = () => {
	const [title, setTitle] = useState('');
	const [dishes, setDishes] = useState([]);
	const dishesCollectionRef = collection(db, "dishes");


	useEffect(() => {
		const getDishes = async () => {
			const data = await getDocs(dishesCollectionRef);
			setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getDishes();
	}, []);


	async function handleFilter() {
		// Make the initial query
		const q = query(collection(db, "dishes"), where("category", "==", "burger"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			setDishes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

			console.log(querySnapshot)

		});


	}





	return (
		<div>
			<button onClick={handleFilter}>press</button>
			{
				dishes.map((dish) => {
					return (
						<div>
							<div>title: {dish.title}</div>
							{/*<img src={dish.image} alt="image"/>*/}

						</div>
					)
				})
			}

		</div>
	)
}

export default New;