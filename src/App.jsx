import { useState } from "react"
import AppBar from './components/AppBar'
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Dialog } from "@mui/material";
import Home from "./components/Home";
export default function App() {
 const [tasks, setTasks] = useState([]);
 const [addtask, setAddtask] = useState(false);
 const [editingTask, setEditingTask] = useState(null);

 const isEmpty = tasks.length === 0;

 function onAdd(task){
  const taskId = {id:crypto.randomUUID(), completed: false, ...task}
  setTasks([...tasks,taskId])
  console.log(tasks)
 }
 
 function onDelete(id){

    let newTasks = tasks.filter((t) =>{
      return t.id !== id;
    })
    setTasks(newTasks);
 }
  function onEdit(fields){

    let newTasks = tasks.map((t)=> t.id === editingTask.id ? {...t, ...fields} : t)
    setTasks(newTasks);
    setEditingTask(null)
    setAddtask(false);
  }
  function onToggle(id){
    let newTasks = tasks.map((t)=> {
      if(t.id===id){
       if(!t.completed){
        return {...t, completed: true}
      }
      else{
        return {...t, completed: false}
      }
    }
    else{
      return t;
    }
  })
    setTasks(newTasks)
  }
  function onFilter(type){

  }

  function onSubmit(fields){
    onAdd(fields);
    setAddtask(false);
  }
  return (
    <div>
      <AppBar addtask={addtask} setAddtask={setAddtask} />
      <Dialog
      open={addtask}
      onClose={()=> {setEditingTask(null); setAddtask(false)}}
      >
      {
        editingTask ?
         <TaskForm
          initialValues={editingTask}
          onSubmit={onEdit}
          onCancel={()=> {setEditingTask(null); setAddtask(false)}}
        />
        : <TaskForm
            onSubmit={onSubmit}
            onCancel={()=> setAddtask(false)}
            />
      }
      </Dialog>
      {isEmpty ? <Home /> : <TaskList tasks={tasks} onEdit={(task)=> {setEditingTask(task); setAddtask(true);}} onToggle={onToggle} onDelete={onDelete}/>}
    </div>
  )
}
