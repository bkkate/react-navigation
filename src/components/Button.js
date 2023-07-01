// import PropTypes from "prop-types";
import className from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const classes = className(rest.className, "flex items-center px-3 py-1.5 border", {
    "border-blue-500 bg-blue-500 text-white": primary, // if primary is true, add the key to the string
    "border-gray-900 bg-gray-500 text-white": secondary,
    "border-green-500 bg-green-500 text-white": success,
    "border-yellow-400 bg-yellow-400 text-white": warning,
    "border-red-500 bg-red-500 text-white": danger,
    "rounded-full": rounded,
    "bg-white": outline,
    "text-blue-500": outline && primary,
    "text-gray-900": outline && secondary,
    "text-green-500": outline && success,
    "text-yellow-400": outline && warning,
    "text-red-500": outline && danger,
  });

  // {...rest} means take all the individual properties & values out of this object and assign all of them as props to the button element
  // onClick = rest.onClick ... 이렇게 모든 걸 다 하는거
  return <button {...rest} className={classes}>{children}</button>;
}

// Button.propTypes = {
//   checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
//     // count will give you a number of props provided with the value of true
//     const count =
//       Number(!!primary) + // JS trivia: Number(true) is 1, Number(false) is 0; !!undefined is false
//       Number(!!secondary) +
//       Number(!!warning) +
//       Number(!!success) +
//       Number(!!danger);

//     // if they pass in more than one (they need to just pick one from the list!), then throw an error
//     if (count > 1) {
//       return new Error(
//         "Only one of primary, secondary, success, warning, danger can be true"
//       );
//     }
//   },
// };

export default Button;
