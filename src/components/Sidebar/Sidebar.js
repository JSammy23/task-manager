import styled from "styled-components";
import React from "react";
import FilterButton from "./FilterButton";

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



const Sidebar = () => {

  return (
    <SidebarDiv>
        <FilterDiv>
            <FilterButton  children='All Tasks'/>
            <FilterButton children='Today' />
            <FilterButton children='This Week' />
        </FilterDiv>
        <Label>
            <h2>Projects</h2>
        </Label>
    </SidebarDiv>
  )
}

export default Sidebar