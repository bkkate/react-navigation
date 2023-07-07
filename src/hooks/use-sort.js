import { useState } from "react";

function useSort(data, config) {
  // sortOrder will be unsorted (null) -> ascending -> descending order
  const [sortOrder, setSortOrder] = useState(null);

  // null, 'Name', 'Score'
  const [sortBy, setSortBy] = useState(null);

  // clicking on the column label for sorting (argument is which label are they clicking on?)
  const setSortColumn = (label) => {
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

    return {
      sortOrder,
      sortBy,
      sortedData,
      setSortColumn,
    };
  }
}

export default useSort;
