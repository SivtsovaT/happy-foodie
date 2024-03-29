import React, { useEffect, useState } from 'react';
import './AddNewAddressPage.scss';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import back from '../../images/back.png';
import { auth, db } from '../../firebase';

function AddNewAddressPage() {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editName, setEditName] = useState(displayName);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const navigate = useNavigate();

  const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub;
    }, []);
    return currentUser;
  };
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser?.displayName || currentUser?.phoneNumber) {
      setDisplayName(currentUser.displayName);
      setPhoneNumber(currentUser.phoneNumber);
      setEditName(currentUser.displayName);
      console.log(currentUser);
    }
  }, [currentUser]);

  const handleEditName = (event) => {
    setEditName(event.target.value);
  };

  const handleEditPhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEditRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleEditCity = (event) => {
    setCity(event.target.value);
  };

  const handleEditStreet = (event) => {
    setStreet(event.target.value);
  };

  const updateUser = () => {
    if (displayName.length === 0) {
      alert('The field "name" cannot be empty');
    } else if (phoneNumber.length < 13) {
      alert('The field "phone" must be "+380000000000" format');
    } else if (region.length === 0) {
      alert('The field "region" cannot be empty');
    } else if (city.length === 0) {
      alert('The field "city" cannot be empty');
    } else if (street.length === 0) {
      alert('The field "street" cannot be empty');
    } else {
      // const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: editName.valueOf(),
      });
      const userId = auth.currentUser.uid;
      const userRef = doc(db, `users/${userId}`);
      setDoc(userRef, {
        region,
        city,
        street,
        phone: phoneNumber,
      }, { merge: true });
      alert('Updated users details');
    }
  };

  return (
    <div className="content">
      <div onClick={() => navigate(-1)} onKeyUp={() => navigate(-1)} role="presentation" className="link-panel">
        <div className="link-wrapper">
          <img src={back} alt="back" />
        </div>
        <div className="address-title">Add new address</div>
      </div>
      <div className="add-user-data">
        <div className="add-user-data_title">Full name</div>
        <input
          className="input-log width-295 height-58"
          type="text"
          value={editName}
          onChange={handleEditName}
        />
      </div>
      <div className="add-user-data">
        <div className="add-user-data_title">Phone Number</div>
        <input
          className="input-log width-295 height-58"
          type="text"
          value={phoneNumber}
          onChange={handleEditPhoneNumber}
        />
      </div>
      <div className="add-user-data">
        <div className="add-user-data_title">Region</div>
        <input
          className="input-log width-295 height-58"
          type="text"
          value={region}
          onChange={handleEditRegion}
        />
      </div>
      <div className="add-user-data">
        <div className="add-user-data_title">City</div>
        <input
          className="input-log width-295 height-58"
          type="text"
          placeholder="Select city"
          value={city}
          onChange={handleEditCity}
        />
      </div>
      <div className="add-user-data">
        <div className="add-user-data_title">Street (Include house number)</div>
        <input
          className="input-log width-295 height-58"
          type="text"
          placeholder="Street"
          value={street}
          onChange={handleEditStreet}
        />
      </div>
      <button type="button" onClick={updateUser} className="btn btn-322 add-address">Update</button>

    </div>
  );
}

export default AddNewAddressPage;
