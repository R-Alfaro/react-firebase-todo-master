import moment from 'moment'
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import { useState, useEffect } from "react";

import { db } from "./firebase_config";
import firebase from "firebase";

import "./App.css";
import TodoListItem from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  return (
    <div className="App">
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",width: "100%" }}>
        <h1>😃  TODO List for ({moment(Date()).format('MMMM Do YYYY')})  😃</h1>
        

        <form>
          <TextField id="standard-basic" label="Write a Todo" 
            value={todoInput} style={{ width: "90vw", maxWidth: "500px" }} 
            onChange={(e) => setTodoInput(e.target.value)}/>

          <Button type="submit" variant="contained" onClick={addTodo} style={{ display: "none" }}>Add Todo</Button>
        </form>

        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "5px" }}>
          {todos.map((todo) => (
            <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id} />
          ))}
          <hr></hr>
          <h6 style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",width: "100%" }}>by Ramiro Alfaro using Firebase </h6>       </div>
      </div>
    </div>
  );
}

export default App;
