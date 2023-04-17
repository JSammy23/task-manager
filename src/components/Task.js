import { updateDoc, doc } from '@firebase/firestore';
import React, { useState } from 'react'
import styled from 'styled-components'
import db from '../services/storage';

const Tile = styled.div`
    display: flex;
    padding: .5em;
    border-bottom: 1px solid #71717A;
    align-items: center;
`;

const TaskInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: .2em;
`

const Title = styled.h3`
    color: #fff;
`;
const Note = styled.p`
    color: #D6D3D1;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 10px;

  &:checked {
    background-color: #34bc81;
    border: 1px solid #000;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #007aff33;
  }
`;

const Task = ({ task }) => {

    const [completed, setCompleted] = useState(task.completed)

    const userId = task.userId;
    const taskId = task.id;

    const taskRef = doc(db, 'users', userId, 'tasks', taskId)

    const handleChange = async () => {
        // TODO: toggle completed status
       await updateDoc(taskRef, {
        completed: !completed
       });
        //    Update local state
       setCompleted(!completed);
    };

  return (
    <Tile>
        <Checkbox type='checkbox' checked={completed} onChange={handleChange} />
        <TaskInfo>
            <Title>{task.title}</Title>
            <Note>{task.note}</Note>
        </TaskInfo>

    </Tile>
  )
}

export default Task