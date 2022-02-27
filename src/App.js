import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList"; // IMPORT COMPONENT
import { v4 as uuidv4 } from 'uuid'; // IMPORT UUID TO CREATE RANDOM IDS
import '../src/style.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { TextField } from "@mui/material";
import { Input } from '@mui/material';

function App() {

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

  //useState 
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'todosApp.todos'

  //Local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (e) {
    const name =  todoNameRef.current.value
    if ( name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, { id: uuidv4(), name: name, complete:
      false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo (e) {
    const newTodos =  todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }

 return (
  // FRAGMENT, ALLOWS TO RETURN MORE THAN ONE HTML ELEMENT <>DIV BUTTON INPUT ETC.. </>
   <>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TASK TRACKER
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

  <div className="space-btn">
  <div className="input">
    <input ref={todoNameRef} type="text"/>
  </div>
  <div className="add">
    <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddTodo}>ADD</Button>
  </div>
    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClearTodo}>CLEAR</Button>
  </div>
  <div className='text-left'>{todos.filter(todo => !todo.complete).length} LEFT TO DO</div>
  <TodoList todos={todos} toggleTodo={toggleTodo}/>

  </>

 )
}

export default App;
