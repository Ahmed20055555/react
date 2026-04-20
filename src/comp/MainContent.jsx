import { useContext } from "react";
import ThemeContexttt from "../Datacontext";


const MainContent = ({ pageName }) => {

  const { theme } = useContext(ThemeContexttt);

  return (
    <main className={`${theme === "dark" ? "maindark" : "" } `}>
      {pageName}
      <br />
    </main>
  );
};

export default MainContent;
