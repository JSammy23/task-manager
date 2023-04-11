import React, { useState } from 'react'
import { logout } from '../services/auth';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const StyledHeader = styled.header`
    background: linear-gradient(to right, #34e89e, #0f3443);
    padding: .3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
`;

const StyledLogo = styled.h1`
    font-size = 2em;
    color: #fff;
    padding-left: .5em
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding-right:1em;
`

const Hamburger = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 1.5em;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 138%;
  right: 0;
  min-width: 8em;
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 10px;
  background-color: #25a079;
  border: 1px solid #ddd;
  cursor: pointer;
  

  &:hover {
    background-color: #ddd;
  }
`;

const Header = ({ authObject, setShowProfile }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfile = () => {
    setShowProfile(true);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <StyledHeader>
        <StyledLogo>Task</StyledLogo>
        <FlexDiv>
          <p>Hello, {authObject.currentUser.displayName || "User"}</p>
          <DropdownContainer>
            <Hamburger onClick={handleDropdownToggle}>
              <FontAwesomeIcon icon={faBars} />
            </Hamburger>
            <DropdownMenu isOpen={isDropdownOpen}>
              <MenuItem onClick={handleEditProfile} >Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </DropdownMenu>
          </DropdownContainer>
        </FlexDiv>
    </StyledHeader>
  )
}

export default Header