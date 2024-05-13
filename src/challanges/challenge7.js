import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Results = () =>{ return <> <h1> THANK YOU FOR SUBMITTING DATA </h1></>}
const Challenge7 = () =>{
    const [name ,setName] = useState('');
    const [age , setAge] = useState('');

    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        name === "name" ? setName(value) : setAge(value);
      };
    const submitdata = () =>{
        Navigate("/results");
    }
    return(
        <>
            <form onSubmit={submitdata}>
                <div>Name : <input type='text' value={name} name='name' onChange={handleChange}/></div>
                <div>Age : <input  type='number' value={age} name='age' onChange={handleChange}/></div>

                <input type='submit' />
            </form>
        </>
    )
}
export default Challenge7;
