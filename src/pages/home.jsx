
import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { Link } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';




const Home = () => {

  const handleVerify = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    alert("تم إرسال رسالة التحقق");
  } catch (error) {
    if (error.code === "auth/too-many-requests") {
      alert("حاول تاني بعد شوية");
    }
  }
};

  const [user] = useAuthState(auth);


  if (user) {

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="Home Page" />
          </Helmet>

          <Header />


          <main>
            <p>welcome to my website {user.displayName}</p>
          </main>



          <Footer />
        </>
      );
    }

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="Home Page" />
          </Helmet>

          <Header />


          <main>
            <p> send email verification to {user.displayName}</p>
            <button className='btn-verify' onClick={handleVerify}>Resend Email Verification</button>
        </main >



          <Footer />
        </>
      );
    }

  }

if (!user) {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
      </Helmet>

      <Header />


      <main>
        <p>go to login page <Link to="/signup">Signup</Link> </p>
      </main>



      <Footer />
    </>
  );
}



}

export default Home;
