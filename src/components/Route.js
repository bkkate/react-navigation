import { useContext } from "react";
import NavigationContext from "../context/navigation";

function Route({ path, children }) {
  const { currentPath } = useContext(NavigationContext);

  if (path === currentPath) {
    return children;
  }

  //else, don't render at all
  return null;
}

export default Route;
