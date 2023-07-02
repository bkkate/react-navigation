import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  // we will assign this to the root div of Dropdown (look at return JSX below)
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      // handling: if the divEl is not assigned any element  (it'll be null)
        // in case if we make a reference to it and toggle the element (decide to show or not show element)-- not here, but in future projects
      if (!divEl.current) {
        return; 
      }
      // if user did NOT click INSIDE the dropdown component (=== if they clicked outside the dropdown)
      if (!divEl.current.contains(event.target)) {
        //collapse the dropdown
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

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
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  // {selection?.label || 'Select...'} what this means:
  // ? checks whether it's undefined/null (so it doesn't throw an error when you try to access a null)
  // select?.label will either return a selection.label if selection is not null, it null, select?.label will simply return undefined instead of throwing an error
  // || operator returns the first truthy
  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || "Select..."}
        <GoChevronDown className="text-lg" />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
