import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Module, Input, Label, Title, Button } from '../styles/StyledComponents';
import theme from '../styles/theme';

const TaskModule = ({header, action, task, showModule, addTask}) => {

  const [title, setTitle] = useState(task?.title || '');
  const [note, setNote] = useState(task?.note || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || null);

  const handleCloseModule = () => {
    showModule(false);
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

  const handleAddTask = () => {
    addTask(createTask(title, note, dueDate));
    showModule(false);
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
            <Input type='date' name='dueDate' id='dueDate' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <Button primary type='button' onClick={handleAddTask} >{action}</Button>
            <Button type='button' onClick={handleCloseModule} >Cancel</Button>
          </form>
      </Module>
    </ThemeProvider>
  )
}

export default TaskModule