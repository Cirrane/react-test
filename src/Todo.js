import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function Todo({ todo, toggleTodo }) {

    const [todos, setTodos] = useState([]);

    function handleClearTodo (e) {
        const newTodos =  todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    
      }

    function handleTodoClick (){
        toggleTodo(todo.id)
    }

  return (

    <div className='DIV-BOX'>
        <label className='labeltype'>          
            <table className='table-div'>
            <tbody>
                <tr>
                <td className='td-style'>
                    <Checkbox type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                </td>
                <td>
                    <h3>{todo.name}</h3>
                </td>     
                </tr>
            </tbody>
        </table>
        </label>
    </div>
  )
}
