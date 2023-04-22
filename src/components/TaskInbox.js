import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import FilterContext from '../services/FilterContext';
import { isToday, isThisWeek, addDays } from 'date-fns';
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


const TaskInbox = ({ tasks, currentUser }) => {

    const [addTaskModule, setAddTaskModule] = useState(false);
    const [daily, setDaily] = useState([]);
    const [weekly, setWeekly] = useState([]);

    const { activeFilter } = useContext(FilterContext);

    let taskCount = tasks.length;

    // Set daily tasks
    useEffect(() => {
        const dailyTasks = tasks.filter(task => {
            const dueDate = task.dueDate ? (typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate.toDate()) : null;
            const date = addDays(dueDate, 1);
            return isToday(date)
        });
        setDaily(dailyTasks);
    }, [tasks]);

    // Set weekly tasks
    useEffect(() => {
        const weeklyTasks = tasks.filter(task => {
            const dueDate = task.dueDate ? (typeof task.dueDate === 'string' ? new Date(task.dueDate) : task.dueDate.toDate()) : null;
            const date = addDays(dueDate, 1);
            return isThisWeek(date);
        });
        setWeekly(weeklyTasks);
    }, [tasks]);

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
        const newTask = await addTask(currentUser.uid, task);
    };

    const toggleAddTaskModule = () => {
        setAddTaskModule(true);
    };

    // Render tasks by filter
    const renderTasks = () => {
        switch (activeFilter) {
            default:
                return tasks.map(task => <Task key={task.id} task={task} />);
            case 'Today':
                return daily.map(task => <Task key={task.id} task={task} />);
            case 'This Week':
                return weekly.map(task => <Task key={task.id} task={task} />);
        }
    }

  return (
    <TaskContainer>
        {addTaskModule && <TaskModule action="add" header="New Task" btnText='Add Task' showModule={setAddTaskModule} addTask={handleAddTask}/>}
        <TaskHeader>{activeFilter}</TaskHeader>
        <TaskBar>
        <p>Tasks ({taskCount})</p>
        <IconBtn onClick={toggleAddTaskModule} ><FontAwesomeIcon icon={faPlus} /></IconBtn>
        </TaskBar>
        <TaskDiv>
            {renderTasks()}
        </TaskDiv>
    </TaskContainer>
  )
}

export default TaskInbox