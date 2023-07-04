import useNavigation from "../hooks/use-navigation";

function Route({ path, children }) {
  const { currentPath } = useNavigation();

  if (path === currentPath) {
    return children;
  }

  //else, don't render at all
  return null;
}

export default Route;
