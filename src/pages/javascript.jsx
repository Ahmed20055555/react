

import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet } from 'react-helmet-async';


const Javascript = () => {
  return (
    <>


    <Helmet>
      <title>JAVASCRIPT Page</title>
      <meta name="description" content="JAVASCRIPT Page" />
    </Helmet>
    <Header />
    <MainContent pageName="JAVASCRIPT Page" />
    <Footer />
  </>
  );
}

export default Javascript;
