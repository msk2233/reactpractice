import * as React from "react";
import {
  Link,
  useParams
} from "react-router-dom";

export const Employee = () => {
    const { name } = useParams();
  
    return (
      <div className="display">
        <h3>Employee: {name}</h3>
      </div>
    );
  };
  
  export const Ids = () => {
    const { id } = useParams();
  
    return (
      <div className="display">
        <h3>Ids : {id}</h3>
      </div>
    );
  };

export default function Challenge8() {
    return (
      <>
        <h2>Customer</h2>
        <ul>
          <li>
            <Link to="/ram">Ram</Link>
          </li>
          <li>
            <Link to="/rakshman">Lakshman</Link>
          </li>
          <li>
            <Link to="/bheem">Bheem</Link>
          </li>
        </ul>
        <h2>Ids</h2>
        <ul>
          <li>
            <Link to="/Idss/1">1</Link>
          </li>
          <li>
            <Link to="/Idss/2">2</Link>
          </li>
          <li>
            <Link to="/Idss/3">3</Link>
          </li>
          <li>
            <Link to="/Idss/4">4</Link>
          </li>
        </ul>
  
        </>
    );
  }