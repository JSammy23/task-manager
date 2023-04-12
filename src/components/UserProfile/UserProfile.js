import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth';
import { Module, Input, Label, Title, Button } from '../../styles/StyledComponents'
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';


const UserProfile = ({ authObject, setShowProfile }) => {

    const [displayName, setDisplayName] = useState(authObject.currentUser.displayName || '');
    const [email, setEmail] = useState(authObject.currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState(authObject.currentUser.phoneNumber || '');

    const updateUserProfile = async () => {
      
      try {
        await updateProfile(authObject.currentUser, {
          displayName,
          email,
          phoneNumber
        });
        console.log('Profile updated successfully!')
      } catch (error) {
        console.log('Error updating profile: ', error)
      }

      setShowProfile(false);
    };

    const handleCloseModule = () => {
      setShowProfile(false);
    };

  return (
    <ThemeProvider theme={theme} >
      <Module>
        <Title>User Profile</Title>
          <form>
              <Label htmlFor='displayName' color='#fff' >Display Name:</Label>
              <Input
              type="text"
              id='displayName'
              name='displayName'
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              required />
              <Label htmlFor='email' >Email:</Label>
              <Input
              type='email'
              id='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email} />
              <Label htmlFor='phoneNumber'>Phone Number:</Label>
              <Input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber} />
              <Button primary type='button' onClick={updateUserProfile} >Save</Button>
              <Button type='button' onClick={handleCloseModule} >Close</Button>
          </form>
      </Module>
    </ThemeProvider>
  )
}

export default UserProfile