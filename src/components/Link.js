import { useContext } from "react";
import NavigationContext from "../context/navigation";

function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext);

  const handleClick = (event) => {
    event.preventDefault(); // prevent normal navigation

    //programmatic navigation (by accessing/using navigation provider)
    navigate(to);
  };
  return <a onClick={handleClick}>{children}</a>;
}

export default Link;
