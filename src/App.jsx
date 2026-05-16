import { useState } from "react"

export default function App() {
 const [tasks, setTasks] = useState([]);


 function onAdd(task){
  setTasks([...tasks,task])
 }
 
 function onDelete(id){

    let newTasks = tasks.filter((id) =>{
      return tasks.id !== id;
    })
    setTasks(newTasks);
 }
  function onEdit(id, editedTask){
    let newTasks = tasks.map((t)=> tasks.id === id ? {...t, editedTask} : t)
    setTasks(newTasks);
  }
  function onToggle(id){
    let newTasks = tasks.map((t)=> t.id===id ? {...t, completed: true}: t)
  }
  function onFilter(type){

  }
  return (
    <div>
      
    </div>
  )
}
