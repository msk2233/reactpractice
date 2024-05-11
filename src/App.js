import React from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
    //THIS ALSO CAN DONE FOR INLINE CSS (ADD THIS MYSTYLE VARABLE IN FROM TAG LIKE => style={mystyle})
    // const mystyle = {
    //     color: "white",
    //     backgroundColor: "DodgerBlue",
    //     padding: "50px",
    //     fontFamily: "Arial",
    //     width: "400px",
    //     margin: "50px"
    // };
    return (
        <form className='thisisform'>
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
