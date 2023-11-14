import { useEffect, useState } from 'react';
import './App.css';
import Task from './Components/Task';
import Tasks from './Components/Tasks';

function App() {

const [tasks, setTasks] = useState([])
const [input, setInput] = useState("")

const getData = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3030/tasks", requestOptions)
    .then((response) => response.json())
    .then((result) => setTasks(result))
    .catch((error) => console.log("error", error));
};

useEffect(() => {
  getData();
}, []);


const addTask = () => {
  const newTask = {
      id: tasks[tasks.length-1].id + 1,
      name: input,
      reminder: false
  }
    fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }) .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw Error("Failed to create task.");
            }
          }).then((newTaskFromServer) => {
                  setTasks([...tasks, newTaskFromServer]);
                  setInput("");
                });
}

const removeTask = (id) => {
  fetch(`http://localhost:3030/tasks/${id}`, {
      method: "DELETE"
    }).then((resp) => {
      if (resp.ok) {
        setTasks(tasks.filter(task => task.id !== id))
      }
    });
}

const setReminder = (id) => {
  const newTask = tasks.find(task => task.id === id)
  const newTaskIndex = tasks.findIndex(task => task.id === id);
  newTask.reminder = !newTask.reminder
  const newTasks = [...tasks]
  newTasks[newTaskIndex] = newTask;
  
  fetch(`http://localhost:3030/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  })
    .then(res => {
      if (res.ok) {
        setTasks(newTasks)
      } else {
        throw Error("Failed to create task.");
      }
    })
}

  return (
    <div className="container-fluid mt-5 text-center card border-0" style={{ width: "350px", height: "500px" }}>
      <h3 className="mb-3 card-title"><i>Tasks</i></h3>
      <Task input={input} setInput={setInput} addTask={addTask} className="mb-3 card-body" />
      <Tasks tasks={tasks} removeTask={removeTask} setReminder={setReminder} className="text-center card-text" />
    </div>
  );
}

export default App;
