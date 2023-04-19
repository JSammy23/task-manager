import { updateDoc, doc } from '@firebase/firestore';
import React, { useState } from 'react'
import styled from 'styled-components'
import db from '../services/storage';
import { format, parseISO } from 'date-fns';

const Tile = styled.div`
    display: flex;
    padding: .5em;
    border-bottom: 1px solid #71717A;
    align-items: center;
    transition: .5s;

    &:hover {
      background-color: #103c47;
    }
`;

const TaskInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: .2em;
`

const Title = styled.h3`
    color: ${(props) => (props.completed ? '#D6D3D1' : '#fff')};
    text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
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
  cursor: pointer;

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

    // Set task & user
    const userId = task.userId;
    const taskId = task.id;

    const taskRef = doc(db, 'users', userId, 'tasks', taskId)

    const handleChange = async () => {
       await updateDoc(taskRef, {
        completed: !completed
       });
       setCompleted(!completed);
    };

    // Format dueDate
    let formattedDate;
    if (task.dueDate) {
        const dueDate = task.dueDate.toDate(); // convert Firestore Timestamp to Date object
        formattedDate = dueDate.toLocaleDateString(); // format the Date object
    }

  return (
    <Tile>
        <Checkbox type='checkbox' checked={completed} onChange={handleChange} />
        <TaskInfo>
            <Title completed={completed} >{task.title}</Title>
            <Note>{task.note}</Note>
        </TaskInfo>
        <Note>{formattedDate}</Note>
    </Tile>
  )
}

export default Task