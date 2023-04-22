import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import styled, { ThemeProvider } from 'styled-components';
import { Module, Input, Label, Title, Button } from '../styles/StyledComponents';
import theme from '../styles/theme';

const TaskModule = ({header, action, btnText, task, date, taskRef, showModule, addTask, setEditTask}) => {

  const [title, setTitle] = useState(task?.title || '');
  const [note, setNote] = useState(task?.note || '');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (action === 'edit' && date) {
      setDueDate(date.toISOString().substr(0, 10))
    };
  }, [action, date]);

  const handleCloseModule = () => {
    if (action === 'add') {
      showModule(false);
    } else if (action === 'edit') {
      setEditTask(false);
    }
  };

  const createTask = (title, note, dueDate) => {
    let dueDateObject = null;
    if (dueDate !== null) {
      const date = new Date(dueDate);
      dueDateObject = date;
    }

    return {
        title: title,
        note: note,
        dueDate: dueDateObject,
        completed: false,
    };
  };

  // Handle add task
  const handleAddTask = () => {
    addTask(createTask(title, note, dueDate));
    showModule(false);
  };

  // Handle edit task
  const handleEditTask = async () => {
    setEditTask(false);
    // db edit
    await updateDoc(taskRef, {
      title: title,
      note: note,
      dueDate: dueDate,
    });
  };

  const handleConfirmClick = () => {
    if (action === 'add') {
      handleAddTask();
    } else if (action === 'edit') {
      handleEditTask();
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Module>
          <Title>{header}</Title>
          <form>
            <Label htmlFor='title'>Title: </Label>
            <Input type='text' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Label htmlFor='note'>Note: </Label>
            <Input type='text' name='note' id='note' value={note} onChange={(e) => setNote(e.target.value)} />
            <Label htmlFor='dueDate'>dueDate: </Label>
            <Input type='date' name='dueDate' id='dueDate' value={dueDate ? dueDate : ''} onChange={(e) => setDueDate(e.target.value)} />
            <Button primary type='button' onClick={handleConfirmClick} >{btnText}</Button>
            <Button type='button' onClick={handleCloseModule} >Cancel</Button>
          </form>
      </Module>
    </ThemeProvider>
  )
}

export default TaskModule