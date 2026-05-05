import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeContexttt from "../Datacontext";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth"
import { FaUser } from "react-icons/fa";


const Header = () => {

  const { theme, toggolemode, profile, setProfile } = useContext(ThemeContexttt);
  const [user , loading , error] = useAuthState(auth);

  function signout() {
    signOut(auth).then(() => {
      console.log("sign out done");
    }).catch((error) => {
      console.error("sign out error", error);
    });
  }


if (loading) {
  return <p>loading...</p>
}
  
  return (
    <div >


      <header className={`${theme} hide-when-mobile `} >

        <h1>
          <Link to="/">c4a.dev</Link>
        </h1>

        <button onClick={() => toggolemode(theme === "dark" ? "light" : "dark")} className="btn-mode-toggle" >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <ul className="main-ul" >

          {user && user?.emailVerified &&
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/About">
                  About
                </NavLink>
              </li>


              <li className="main-list">
                <NavLink className="main-link" to="/profile">
                  profile
                </NavLink>
              </li>


              <li className="main-list">
                <button onClick={signout} className="main-link signout" >
                  sign out
                </button>
              </li>

              <li className="main-list">
                <NavLink onClick={() => setProfile(!profile)} className="main-link" >
                  <FaUser />
                </NavLink>
              </li>


            </>
          }

          {
             !user?.emailVerified &&
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/signin">
                  signin
                </NavLink>
              </li>
              <li className="main-list">
                <NavLink className="main-link" to="/signup">
                  signup
                </NavLink>
              </li>
            </>
          }

        </ul>

      </header>


      <header style={{ backgroundColor: "red" }} className="show-when-mobile">
        <h1>c4a.dev</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">Full Course</a>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">Full Course</a>
              </li>
              <li>
                <a href="">CSS Examples</a>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <a href="">project 1</a>
                  </li>
                  <li>
                    <a href="">project 2</a>
                  </li>
                  <li>
                    <a href="">project 3</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">coming soon🔥</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

    </div>
  );


};

export default Header;

// onClick={ () => setTheme("light") }
// className={`${theme}`}