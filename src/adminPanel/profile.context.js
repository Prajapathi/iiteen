/* eslint-disable import/no-extraneous-dependencies */
// import firebase from 'firebase/app';
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth, database } from '../misc/firebase';
import firebase from 'firebase';

// export const isOfflineForDatabase = {
//   state: 'offline',
//   last_changed: firebase.database.ServerValue.TIMESTAMP,
// };

// const isOnlineForDatabase = {
//   state: 'online',
//   last_changed: firebase.database.ServerValue.TIMESTAMP,
// };

const ProfileContext = createContext();
export const  ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState("a"); // we just do not disturctured the second variable here in usestate
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const db = firebase.firestore();
    if(firebase.auth().currentUser!=undefined){
      db.collection("User")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        console.log("Current data: ", new Date().getTime(),doc.data().admin,new Date()-doc.data().admin);
        if(new Date().getTime()-doc.data().admin<86400000){
          setProfile(true)
        }else setProfile(false)
        setIsLoading(false)
    });
    }
       
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
