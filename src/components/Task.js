import { updateDoc, doc, deleteDoc } from '@firebase/firestore';
import React, { useMemo, useState } from 'react'
import db from '../services/storage';
import { format, parseISO } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components'
import TaskModule from './TaskModule';


const Tile = styled.div`
    display: flex;
    padding: .5em;
    border-bottom: 1px solid #71717A;
    align-items: center;
    transition: .5s;
    justify-content: space-between;

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

const TaskBtn = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  color: #D6D3D1;
  cursor: pointer;
  font-size: 1em;
  margin-right: .4em;

  &:hover {
    color: #67E8F9;
  }
`



const Task = React.memo(({ task }) => {
  

    const [completed, setCompleted] = useState(task.completed);
    const [editTask, setEditTask] = useState(false);

    // Set task & user
    const userId = task.userId;
    const taskId = task.id;
    // console.log(task);
    const taskRef = doc(db, 'users', userId, 'tasks', taskId)

    

    const toggleComplete = async () => {
      setCompleted(!completed);
      await updateDoc(taskRef, {
        completed: !completed
       });
    };

    // Handle edit task
    const toggleEditModule = () => {
      setEditTask(true);
    }

    // Handle delete task
    const handleDeleteTask = async () => {
      await deleteDoc(taskRef)
    };

    // Format dueDate
    let formattedDate;
    if (task.dueDate) {
        const dueDate = task.dueDate.toDate(); // convert Firestore Timestamp to Date object
        formattedDate = format(dueDate, "MMM do")
    };

  return (
    <Tile>
        <div className='flex'>
          <Checkbox type='checkbox' checked={completed} onChange={toggleComplete} />
          <TaskInfo>
              <Title completed={completed} >{task.title}</Title>
              <Note>{task.note}</Note>
          </TaskInfo>
        </div>
        <TaskInfo>
          <Note>{formattedDate}</Note>
          <div className='flex' >
            <TaskBtn onClick={toggleEditModule} >
              <FontAwesomeIcon icon={faPenToSquare} />
            </TaskBtn>
            <TaskBtn onClick={handleDeleteTask} >
              <FontAwesomeIcon icon={faTrashCan} />
            </TaskBtn>
          </div>
        </TaskInfo>
        { editTask && <TaskModule action="edit" header='Edit Task' task={task} taskRef={taskRef} setEditTask={setEditTask} btnText='Edit Task' />}
    </Tile>
  )
});

export default Task