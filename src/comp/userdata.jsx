import { useContext } from "react";
import ThemeContexttt from "../Datacontext";
import { useAuthState } from "react-firebase-hooks/auth";


export function UserData({ auth }) {

    const { profile, setProfile } = useContext(ThemeContexttt);
    const [user] = useAuthState(auth);

    if (!profile) {
        return null;
    }


    console.log(" user -->> ", user)


    return (

        <div className="user-height">

            {/* الخلفية الشفافة */}
            <div className="overlay" onClick={() => setProfile(false)}></div>

            {/* الكارد */}
            <div className="user-data">
                <div className="user-card">

                    <p onClick={() => setProfile(false)}>✖</p>

                    <h3>email : {user.email}</h3>
                    <h3>name : {user.displayName}</h3>

                </div>
            </div>

        </div>
    );
}