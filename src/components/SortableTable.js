import { useState } from "react";
import Table from "./Table";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

// Look at each object in the config array --> does the object have a 'sortValue' function?
// if so, this column must be sortable
// Add a 'header' property that will show a clickable header cell - when user clicks this, sort the data & pass the sortedData down to data

function SortableTable(props) {
  // sortOrder will be unsorted (null) -> ascending -> descending order
  const [sortOrder, setSortOrder] = useState(null);

  // null, 'Name', 'Score'
  const [sortBy, setSortBy] = useState(null);

  const { config, data } = props;

  // clicking on the column label for sorting (argument is which label are they clicking on?)

  const handleClick = (label) => {
    //resetting to 'asc' if clicking on a different label
    // if sortBy is not null and we clicked on a new label (different from previous label clicked)
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    // asc, desc, null cycle
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  // find the correct sortValue function and use it for sorting
  let sortedData = data;
  // only sort data if sortOder && sortBy are not null
  if (sortOrder && sortBy) {
    // if they're both not null, we need to do the sorting
    const { sortValue } = config.find((column) => column.label === sortBy);
    // make a copy of the data prop (because sorting directly mutates/changes the data)
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a); //  .name  or .score property depending on what label
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        // a number
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  const updatedConfig = config.map((column) => {
    // if the column doesn't have a sortValue func provided,
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column, // all the properties in the object
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ), // and adding a header property
    };
  });

  // sending all the props
  // (and the config prop that's present in props will be overwritten by the config after ...props)
  // (and the data prop that's present in props will be overwritten by sortedData array)
  return <Table {...props} data={sortedData} config={updatedConfig} />;
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoTriangleUp />
        <GoTriangleDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoTriangleUp />
        <GoTriangleDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <GoTriangleUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoTriangleDown />
      </div>
    );
  }
}

export default SortableTable;
