import UserProfile from "./UserProfile";
import React from "react";
import styled from "styled-components";

export default {
    title: 'UserProfile',
    component: UserProfile,
};

const StyledModule = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`

const Template = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentUser: {
    displayName: 'John Doe',
  },
};