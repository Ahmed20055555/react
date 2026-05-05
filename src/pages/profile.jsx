import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useContext, useEffect } from 'react';
import ThemeContexttt from '../Datacontext';



const Profile = () => {

    const [user] = useAuthState(auth);
    const { theme } = useContext(ThemeContexttt);

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <>

            <Helmet>
                <title>profile Page</title>
                <meta name="description" content="HTML Page" />
            </Helmet>

            <Header />
            <main className={`${theme === "dark" ? "maindark" : ""} `} >  {user ?
                <div className='profile-section' >
                   {user.photoURL ? <img className='header-avatar' src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="Profile" /> : null }
                    <p> welcome {user.displayName} <span > 💕 </span> </p>
                    <p> email :  {user.email}  </p>
                </div>
                :
                <p>لا توجد داتا </p>}  </main>
            <Footer />
        </>
    );
}

export default Profile;
