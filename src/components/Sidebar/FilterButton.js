import React, { useContext } from 'react';
import FilterContext from '../../services/FilterContext';
import styled from 'styled-components';


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

const FilterButton = ({ children }) => {

    const { activeFilter, setActiveFilter } = useContext(FilterContext);

    const handleFilterClick = () => {
        setActiveFilter(children)
    };

  return (
    <FilterBtn active={activeFilter === children} onClick={handleFilterClick} >
        {children}
    </FilterBtn>
  )
}

export default FilterButton