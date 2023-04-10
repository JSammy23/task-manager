import React, { useState } from 'react'
import styled from 'styled-components'

const StyledModule = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`

const UserProfile = ({ currentUser }) => {

    const [displayName, setDisplayName] = useState(null)


  return (
    <StyledModule>
        <form>
            <label htmlFor='displayName' >Display Name:</label>
            <input 
            type="text"
            id='displayName'
            name='displayName'
            required />
        </form>
    </StyledModule>
  )
}

export default UserProfile