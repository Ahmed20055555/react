  import { createContext, useReducer, useState } from "react";
  const ThemeContexttt = createContext();

  export function ThemeProvider({ children }) {
  
  const initialState = localStorage.getItem("theme") == "dark" ? "dark" : "light";
  const [profile , setProfile] = useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case "CHANGE_COLOR":
        return action.newvalue;
      default:
        return state;
    }
  }

  const [theme, dispatch] = useReducer(reducer , initialState);

  function toggolemode(newTheme) {
    localStorage.setItem("theme", newTheme);
    dispatch({ type: "CHANGE_COLOR", newvalue : newTheme });
  }

    return (
       <ThemeContexttt.Provider value={{ theme, toggolemode , profile , setProfile }} >
        {children}
       </ThemeContexttt.Provider>
    );
  }
  
  export default ThemeContexttt;