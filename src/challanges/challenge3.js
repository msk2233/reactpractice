import React from 'react';
import { useState, useEffect } from "react";

let btnstyle = {
  fontSize:"10px",
  backgroundColor:"gray",
  color:"white",
  marginLeft:"10px"
}

const Challenge3 = ()=> {
      const [todoList, setTodoList] = useState([]);
      const [input, setInput] = useState("");
      const [id , setId] = useState(1);
  
     
      const addItem = () => {
        if (input.length) {
          setId(id+1)
          const item = { id: id, todo: input, isCompleted: false };
          setTodoList([...todoList, item]);
          setInput("");
        }
      };
      const deleteitem = (e) =>{
        const index = e.target.id;
        const array = [...todoList];
        if (index > -1) {
          array.pop();
        }
        setTodoList([...array]);
     
      }
      return (
        <div style={{backgroundColor:"beige",width:"500px",height:"80vh"}}>
          <h2>Todo List</h2>
          <div>
            <input
              placeholder="Enter City"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addItem}>Add</button>
          </div>
  
          <div>
            <ul>
              {todoList.map(({ id, todo }) => (
                <li key={id}>
                  {todo}
                  {todoList.length !== 0 ? <button id={id} style={btnstyle} onClick={deleteitem}> DELETE </button> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
  export default Challenge3;