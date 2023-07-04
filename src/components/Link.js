import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation();

  // text-blue-500 will always be applied. Developers can pass in additional class names through className prop
  const classes = classNames(
    "text-blue-500",
    className,
    // activeClassName will show if currentPath === to (returns the last true)
    currentPath === to && activeClassName
  );

  const handleClick = (event) => {
    // if user is holding command (mac) or control key (windows)
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault(); // prevent normal navigation

    //programmatic navigation (by accessing/using navigation provider)
    navigate(to);
  };
  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
