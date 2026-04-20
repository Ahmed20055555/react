import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HTML from "./pages/html";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
import { useContext } from "react";
import ThemeContexttt from "./Datacontext";
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import { UserData } from "./comp/userdata";
import { auth } from "./firebase/config";
import { SucssusSignin } from "./comp/sucssus-signin";
import Profile from "./pages/profile";


function App() {

  const { theme } = useContext(ThemeContexttt);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <SucssusSignin>  <Home /> </SucssusSignin>,
      errorElement: <h1>SORROY.........</h1>,
    },

    {
      path: "/html",
      element: <SucssusSignin> <HTML /> </SucssusSignin>,
    },

    {
      path: "/css",
      element: <SucssusSignin> <Css /> </SucssusSignin>,
    },

    {
      path: "/javascript",
      element: <SucssusSignin> <Javascript /> </SucssusSignin>,
    },

    {
      path: "/profile",
      element: <SucssusSignin> <Profile /> </SucssusSignin>,
    },

    {
      path: "/Signin",
      element: <Signin />,
    },

    {
      path: "/Signup",
      element: <Signup />,
    },

  ]);



  return <div className={`${theme}`} >
    <RouterProvider router={router} />;
    <UserData auth={auth} />
  </div>

}

export default App;



