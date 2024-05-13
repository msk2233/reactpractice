import React from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
    uname: "",
    fullname: "",
    age: ""
};

const Challenge5 = () => {
    const [obj, setObj] = useState(initialState);
    const [display, setDisplay] = useState(false);

    const printValues = (e) => {
        e.preventDefault();
        setDisplay(true);
    };
    const updateField = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <form className='d-flex flex-column' onSubmit={printValues}>
                <div>
                    <div style={{ fontWeight: "bolder" }}>UserName :</div>
                    <input className='mb-3' type='text' name="uname" value={obj.uname || ""} onChange={updateField} />
                </div>
                <div>
                    <div style={{ fontWeight: "bolder" }}>FullName :</div>
                    <input className='mb-3' type='text' name="fullname" value={obj.fullname || ""} onChange={updateField} />
                </div>
                <div>
                    <div style={{ fontWeight: "bolder" }}>Age :</div>
                    <input className='mb-3' type='number' name="age" value={obj.age || ""} onChange={updateField} />
                </div>
                <div>
                    <button> SUBMIT </button>
                </div>
                {display && (
                    <>
                        <h4>Request Sent to DB with below request data</h4>
                        <ul>
                            <li>UserName: {obj.uname.toUpperCase()}</li>
                            <li>FullName: {obj.fullname.toUpperCase()}</li>
                            <li>Age: {obj.age}</li>
                        </ul>
                    </>
                )}
            </form>
        </>
    )
}

export default Challenge5;