import React, { useState, useEffect } from 'react'
import FilterContext from '../services/FilterContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TaskInbox from '../components/TaskInbox';
import auth from '../services/auth'
import db from '../services/storage'
import { collection, getDocs, addDoc, collectionGroup, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import UserProfile from '../components/UserProfile/UserProfile'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

const DashboardPage = () => {

  // State Managment
  const [showProfile, setShowProfile] = useState(false);
  const [authObject, setAuthObject] = useState(auth);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);



  // Set the authObject & currentUser on authStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthObject(auth);
    });
    return unsubscribe;
  }, []);

  // Set showProfile if user has never changed displayName
  useEffect(() => {
    if (currentUser && currentUser.displayName === null) {
      setShowProfile(true);
    }
  }, [currentUser]);

  // Get user tasks
  useEffect(() => {
    const tasksQuery = currentUser ? query(
      collectionGroup(db, 'tasks'),
      where('userId', '==', currentUser.uid)
    ) : null;

    const getTasks = async () => {
      if (tasksQuery) {
        const data = await getDocs(tasksQuery);
        console.log(data.docs)
        setTasks(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
    }
    getTasks();
  }, [currentUser]);
  
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header authObject={authObject} setShowProfile={setShowProfile} />
        {showProfile && <UserProfile authObject={authObject} setShowProfile={setShowProfile} />}
        <main className='grid'>
          <FilterContext.Provider value={{activeFilter, setActiveFilter}} >
            <Sidebar />
            <div className="task-body">
              <TaskInbox tasks={tasks} />
            </div>
          </FilterContext.Provider>
        </main>
      </ThemeProvider>
    </>
  )
}

export default DashboardPage;
