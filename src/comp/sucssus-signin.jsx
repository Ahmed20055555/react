import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Signin from "../pages/signin";
import { useNavigate } from "react-router-dom";

export function SucssusSignin({ children }) {

   const navigate = useNavigate();

   const [user] = useAuthState(auth);

    return user && user.emailVerified ? children :  navigate("/Signup");
}