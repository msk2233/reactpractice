import React from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "50px",
        fontFamily: "Arial",
        width: "400px",
        margin: "50px"
    };
    return (
        <form style={mystyle}>
            <div>Form</div>
            <label>Enter your name:
                <input type="text" />
            </label>
        </form>
    )
}
const root6 = ReactDOM.createRoot(document.getElementById('root6'));
root6.render(<MyForm />);

export default MyForm;
