import styled from "styled-components";
import React from "react";

const SidebarDiv = styled.div`
    // border: 3px solid lime;
    background-color: #103c47;
    min-height: 95.2vh;
    min-width: 3em;
    max-width: 18em;
`

const Label = styled.div`
    border-bottom: 1px solid #D6D3D1;
    color: #fff;
    padding: .5em;

`

const FilterDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2em;
    align-items: center;
    padding-top: 1.2em;
    padding-bottom: 3em;
`

const FilterBtn = styled.button`
    width: 80%;
    background-color: ${props => props.active ? '#22D3EE' : '#25a079'};
    color: #fff;
    font-size: 1.3em;
    padding: .5em;
    outline: none;
    border: 2px solid #25a079;
    border-color: ${props => props.active ? '#22D3EE' : '#25a079'};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        border: 2px solid #67E8F9;
    }
`

const Sidebar = ({ activeFilter, onFilterClick }) => {

  return (
    <SidebarDiv>
        <FilterDiv>
            <FilterBtn active={activeFilter === 'tasks'} onClick={() => onFilterClick('tasks')} >All Tasks</FilterBtn>
            <FilterBtn active={activeFilter === 'today'} onClick={() => onFilterClick('today')} >Today</FilterBtn>
            <FilterBtn active={activeFilter === 'weekly'} onClick={() => onFilterClick('weekly')} >Weekly</FilterBtn>
        </FilterDiv>
        <Label>
            <h2>Projects</h2>
        </Label>
    </SidebarDiv>
  )
}

export default Sidebar