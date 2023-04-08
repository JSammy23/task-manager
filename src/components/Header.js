import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
    background: linear-gradient(to right, #34e89e, #0f3443);
    padding: .3em;
`;

const StyledLogo = styled.h1`
    font-size = 2em;
    color: #fff;
    padding-left: .5em
`

const Header = () => {
  return (
    <StyledHeader>
        <StyledLogo>Task</StyledLogo>
    </StyledHeader>
  )
}

export default Header