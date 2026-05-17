import { useEffect, useState } from "react"
import AppBar from './components/AppBar'
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Dialog } from "@mui/material";
import Home from "./components/Home";
import FilterBar from "./components/FilterBar";
import './App.css'

export default function App({toggleDarkmode}) {
 const [tasks, setTasks] = useState(()=> {
  const stored = localStorage.getItem('taskList')
  return stored ? JSON.parse(stored) : []});
 const [addtask, setAddtask] = useState(false);
 const [editingTask, setEditingTask] = useState(null);
 const [filterType, setFiltertype] = useState('all')

 const isEmpty = tasks.length === 0;

 useEffect(()=>{
  localStorage.setItem('taskList',JSON.stringify(tasks));

 },[tasks])
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
    setFiltertype(type)
  }
  const priorityOrder = {high: 1, medium: 2, low: 3}
  const filteredTasks = tasks.filter((t) => {
    if (filterType === 'all') return true
    if (filterType === 'completed') return t.completed === true
    if(filterType === 'pending') return t.completed === false
    return true
  })
  .slice()
  .sort((a,b)=> priorityOrder[a.priority] - priorityOrder[b.priority])

  function onSubmit(fields){
    onAdd(fields);
    setAddtask(false);
  }
  return (
      <>
      <AppBar addtask={addtask} setAddtask={setAddtask} toggleDarkmode={toggleDarkmode} />
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
      <FilterBar onFilter={onFilter} filterType={filterType}/>
      {isEmpty ? <Home /> : <TaskList filterType={filterType} tasks= {filteredTasks} onEdit={(task)=> {setEditingTask(task); setAddtask(true);}} onToggle={onToggle} onDelete={onDelete}/>}
    </>
  )
}
