import React, { useContext } from 'react';
import styled from 'styled-components';
import FilterContext from '../services/FilterContext';
import Task from './Task';

const TaskContainer = styled.div`
    // border: 3px solid lime;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TaskHeader = styled.h1`
    height:max-content;
    margin: 1em 0;
    color: #fff;
    // border-bottom: 1px solid #D6D3D1;
`

const TaskBar = styled.div`
    height:max-content;
    border-bottom: 1px solid #D6D3D1;
    color: #fff;
    width: clamp(20em, 60%, 70%);
`

const TaskDiv = styled.div`
    width: clamp(20em, 60%, 70%);
    height:max-content;
`

const TaskInbox = ({ tasks }) => {

    const { activeFilter } = useContext(FilterContext)

  return (
    <TaskContainer>
        <TaskHeader>{activeFilter}</TaskHeader>
        <TaskBar>Tasks (1)</TaskBar>
        <TaskDiv>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </TaskDiv>
    </TaskContainer>
  )
}

export default TaskInbox