import { useState } from "react";
function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  // when user clicks on the select, it toggles (opens/closes) dropdown
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // when user clicks on an option, the dropdown collapses
  const handleOptionClick = (option) => {
    //CLOSE dropdown
    setIsOpen(false);

    // Communicate back up to handleSelect on App, to re-assign the newly selected option and rerender
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div onClick={() => handleOptionClick(option)} key={option.value}>
        {option.label}
      </div>
    );
  });

  // {selection?.label || 'Select...'} what this means:
  // ? checks whether it's undefined/null (so it doesn't throw an error when you try to access a null)
  // select?.label will either return a selection.label if selection is not null, it null, select?.label will simply return undefined instead of throwing an error
  // || operator returns the first truthy
  return (
    <div>
      <div onClick={handleClick}> {value?.label || "Select..."}</div>
      {isOpen && <div>{renderedOptions}</div>}
    </div>
  );
}

export default Dropdown;
