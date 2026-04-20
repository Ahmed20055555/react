import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useContext } from 'react';
import ThemeContexttt from '../Datacontext';



const Profile = () => {

    const [user] = useAuthState(auth);
    const { theme } = useContext(ThemeContexttt);

    return (
        <>

            <Helmet>
                <title>profile Page</title>
                <meta name="description" content="HTML Page" />
            </Helmet>

            <Header />
            <main className={`${theme === "dark" ? "maindark" : ""} `} >  {user ?
            <div  >
                <p> welcome 💕 </p>
                <p> name :  {user.displayName}  </p>
                <p> email :  {user.email}  </p>
            </div>
              :
             
             <p>لا توجد داتا </p>}  </main>
            <Footer />
        </>
    );
}

export default Profile;
