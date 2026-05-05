import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Css from "./pages/css";
import { useContext } from "react";
import ThemeContexttt from "./Datacontext";
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import { UserData } from "./comp/userdata";
import { auth } from "./firebase/config";
import { SucssusSignin } from "./comp/sucssus-signin";
import Profile from "./pages/profile";
import About from "./pages/html";


function App() {

  const { theme } = useContext(ThemeContexttt);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <h1>SORROY.........</h1>,
    },

    {
      path: "/About",
      element: <SucssusSignin> <About /> </SucssusSignin>,
    },

    {
      path: "/css",
      element: <SucssusSignin> <Css /> </SucssusSignin>,
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
    <RouterProvider router={router} />
    <UserData auth={auth} />
  </div>

}

export default App;



