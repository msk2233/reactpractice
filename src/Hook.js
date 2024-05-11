import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("black");
  return (
    <>
      <h1 style={{color:color}}>My favorite color is {color}! Using React Hook</h1>
      <button className="btn" style={{backgroundColor:"blue"}}
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button className="btn" style={{backgroundColor:"red"}}
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button className="btn" style={{backgroundColor:"pink"}}
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button className="btn" style={{backgroundColor:"green"}}
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  );
}

const root7 = ReactDOM.createRoot(document.getElementById('root7'));
root7.render(<FavoriteColor />);

export default FavoriteColor;            

