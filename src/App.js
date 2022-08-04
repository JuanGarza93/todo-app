import React, {useState} from 'react';
import AddTaskForm from './components/AddTaskForm'; 
import ToDo from './components/ToDo';
import UpdateForm from './components/UpdateForm';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
// State for todo List
const [todo, setTodo] = useState([]);

// Temporary states
const [newTask, setNewTask] = useState('');
const [updateData, setUpdateData] = useState('');


// Functions
// Add a task
const addTask = () => {
  if(newTask) {
    let num = todo.length + 1;
    let newEntry = {id: num, title: newTask, status: false};
    setTodo([...todo, newEntry]);
    setNewTask('');
  }
}
// Delete a task
const deleteTask = (id) => {
  let newTask = todo.filter( task => task.id !== id);
  setTodo(newTask);
}
// Mark task as Done
const markDone = (id) => {
  let newTask = todo.map( task => {
    if( task.id === id) {
      return ({...task, status: !task.status});
    }
    return task;
  })
  setTodo(newTask);
}

const cancelUpdate = () => {
  setUpdateData('');
}

const changeTask = (e) => {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false
  }
  setUpdateData(newEntry);
}

const updateTask = () => {
  let filterRecords = [...todo].filter( task => task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData];
  setTodo(updatedObject);
  setUpdateData('');
}

  return (
    <div className="container App">
      <br></br>
      <br></br>
      <h2>To Do List App (React JS)</h2>
      <br></br>
      <br></br>

      {/*Update task*/}
      {updateData && updateData ? (
       <UpdateForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
       />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )
    }

      {/* Display To Dos */}

      {todo && todo.length ? '' : 'No Tasks..'}

      <ToDo
      todo={todo} 
      markDone={markDone} 
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
      />

    </div>
  );
}

export default App;
