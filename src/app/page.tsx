"use client"

import { useState,useEffect } from "react";
import { createTodo, deleteTodo, getTodo, updateTodo } from "./repository";




export  default  function Home() {
const [Edit, setEdit] = useState(false)
const [value, setValue] = useState("")
const [Id, setId] = useState(0)
const [todos, setTodos] = useState<{ id: number; title: string }[]>([]); 
const [dataUpdated, setDataUpdated] = useState(true);

  function handleSubmit(){
  const title = value
    
    
    if (typeof title !=='string' || title.length===0) {
      throw new Error("invalid Value")
      
    }
    if (Edit===true) {
      updateTodo(Id,value)
      setValue("")
      setDataUpdated(true);
      setEdit(false)
      
    }else{
      createTodo(title)
      setValue("")
      setDataUpdated(true);
    }

  }
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodo();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    if (dataUpdated) {
      fetchTodos();
      setDataUpdated(false); 
    }
  }, [dataUpdated]); 

  function handleChange (e:string){
    console.log(e);
    setValue(e)

  }
  async function  handleDelete (id:number){
    
    deleteTodo(id)
setDataUpdated(true)
  }

  const handleEdit= (id:number,value:string)=>{

    setEdit(true)
    setValue(value)
    setId(id)
  }

  





  return (
    <div className="container mx-auto p-16 ">
      <form action={handleSubmit} className="w-full flex gap-2 mb-4">
        <input
          type="text"
          className="p-2 text-xl w-full border border-slate-400 rounded-lg"
          value={value}
          onChange={e=>handleChange(e.target.value)}
        />
        <button className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-600/90 active:bg-blue-600/80">
         {Edit?'Update':'Add'}
        </button>
      </form>
      <table className="border-collapse table w-full">
        <thead className="border">
          <tr>
            <th className="w-1/5 border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-950  text-left">
              #
            </th>
            <th className="w-3/5 border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-950  text-left">
              Title
            </th>

            <th className="w-1/5 border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-950  text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo,index)=>(
            <tr key={todo.id}>
            <th className="border-b border-slate-200  p-4 pl-8 text-slate-800">
              {index+1}
            </th>
            <td className="border-b border-slate-200  p-4 pl-8 text-slate-800">
              {todo.title}
            </td>

            <td className="border-b border-slate-200  p-4 pl-8 text-slate-800">
              <div className="flex gap-2 ">
                <button  onClick={()=>handleEdit(todo.id,todo.title)} className="bg-green-600 text-white rounded-lg p-4 hover:bg-green-600/90 active:bg-green-600/80">
                  Edit
                </button>
                <button type="button" onClick={()=>handleDelete(todo.id)} className="bg-red-600 text-white rounded-lg p-4 hover:bg-red-600/90 active:bg-red-600/80 trext">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
