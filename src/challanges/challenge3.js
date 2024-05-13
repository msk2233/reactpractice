import React from 'react';
import { useState, useEffect } from "react";

const Challenge3 = ()=> {
    // function ToDo() {
      const [todoList, setTodoList] = useState([]);
      const [input, setInput] = useState("");
  
      const addItem = () => {
        if (input.length) {
          const item = { id: Math.random(), todo: input, isCompleted: false };
          setTodoList([...todoList, item]);
          setInput("");
        }
      };
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
                <li>
                  {todo}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    // }
    // ToDo();
  }
  export default Challenge3;