import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import auth from '../services/auth'
import { onAuthStateChanged } from 'firebase/auth'
import UserProfile from '../components/UserProfile/UserProfile'

const DashboardPage = () => {

  const [showProfile, setShowProfile] = useState(false);
  const [authObject, setAuthObject] = useState(auth)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthObject(auth);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.displayName === null) {
      setShowProfile(true);
    }
  }, [currentUser])
  

  return (
    <>
      <Header />
      <UserProfile currentUser={currentUser} />
      {/* if showProfile load profile component */}
    </>
  )
}

export default DashboardPage