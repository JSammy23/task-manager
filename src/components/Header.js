import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
    background: linear-gradient(to right, #34e89e, #0f3443);
    padding: .3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled.h1`
    font-size = 2em;
    color: #fff;
    padding-left: .5em
`

const Header = ({ authObject }) => {
  return (
    <StyledHeader>
        <StyledLogo>Task</StyledLogo>
        <div>
          <p>Hello, {authObject.currentUser.displayName || "User"}</p>
        </div>
    </StyledHeader>
  )
}

export default Header