import React, { useState } from 'react'
import Header from '../components/Header'
import auth from '../services/auth'

const DashboardPage = ({ currentUser }) => {

  const [showProfile, setShowProfile] = useState(false);

  // Check if display name is null
  if (currentUser.displayName === null) {
    setShowProfile(true);
  }


  return (
    <>
      <Header />
      {/* if showProfile load profile component */}
    </>
  )
}

export default DashboardPage