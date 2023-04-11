import React, { useState } from 'react'
import { Module, Input, Label, Title } from '../../styles/StyledComponents'




const UserProfile = ({ currentUser }) => {

    const [displayName, setDisplayName] = useState(null);
    const [email, setEmail] = useState(currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);


  return (
    <Module>
      <Title>User Profile</Title>
        <form>
            <Label htmlFor='displayName' color='#fff' >Display Name:</Label>
            <Input 
            type="text"
            id='displayName'
            name='displayName'
            onChange={(e) => setDisplayName(e.target.value)}
            required />
            <Label>Email:</Label>
            <Input
            type='email'
            id='email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={currentUser.email} />
            <Label>Phone Number:</Label>
            <Input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={currentUser.phoneNumber} />
        </form>
    </Module>
  )
}

export default UserProfile