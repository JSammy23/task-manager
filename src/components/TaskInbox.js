import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import FilterContext from '../services/FilterContext';
import Task from './Task';
import { addDoc, collection } from 'firebase/firestore';
import db from '../services/storage';
import TaskModule from './TaskModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    margin-bottom: .5em;
    display: flex;
    justify-content: space-between;
    font-size: 1.3em;
`

const TaskDiv = styled.div`
    width: clamp(20em, 60%, 70%);
    height:max-content;
`
const IconBtn = styled.button`
    background: none;
    outline: none;
    border: none;
    color: #fff;
    font-size: 1em;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
`


const TaskInbox = ({ tasks, setTasks, currentUser }) => {

    const [addTaskModule, setAddTaskModule] = useState(false);

    const { activeFilter } = useContext(FilterContext);

    let taskCount = tasks.length;


    useEffect(() => {
        console.log('TaskBox Mounted')
      }, []);
    

    // Define function to add new task
    async function addTask(userId, task) {
        const taskRef = await addDoc(collection(db, 'users', userId, 'tasks'), {
            ...task,
            userId,
        });
        return {...task, id: taskRef.id};
    };

    // Add a new task
    async function handleAddTask(task) {
        console.log('handleAddTask called')
        console.log(currentUser.uid)
        const newTask = await addTask(currentUser.uid, task);
    };

    const toggleAddTaskModule = () => {
        setAddTaskModule(true);
    };

  return (
    <TaskContainer>
        {addTaskModule && <TaskModule action="Add Task" header="New Task" showModule={setAddTaskModule} addTask={handleAddTask}/>}
        <TaskHeader>{activeFilter}</TaskHeader>
        <TaskBar>
        <p>Tasks ({taskCount})</p>
        <IconBtn onClick={toggleAddTaskModule} ><FontAwesomeIcon icon={faPlus} /></IconBtn>
        </TaskBar>
        <TaskDiv>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </TaskDiv>
    </TaskContainer>
  )
}

export default TaskInbox