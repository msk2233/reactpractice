import React, { useState, useContext } from "react";

// Create a context for the theme
const ThemeContext = React.createContext();

let bodyele= document.body.style ;
function dark(){
    bodyele.backgroundColor = "black";
    bodyele.color = "pink";
}
function light(){
    bodyele.backgroundColor = "white";
    bodyele.color = "green";
}

function Comp() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      Current: {theme}
      {theme === "dark" ? dark() : light()}
      <button onClick={() => {setTheme("light")}}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}

export default function Challenge10() {
  // Initialize theme state
  const [theme, setTheme] = useState("light");

  // Provide the theme value and setTheme function to the context
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Comp />
    </ThemeContext.Provider>
  );
}
