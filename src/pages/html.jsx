


import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet } from 'react-helmet-async';



const About = () => {

  return (
    <>

      <Helmet>
        <title>About Page</title>
        <meta name="description" content="About Page" />
      </Helmet>

      <Header />
      <MainContent pageName="About Page" />
      <Footer />
    </>
  );
}

export default About;
