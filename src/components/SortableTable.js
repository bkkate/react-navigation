import Table from "./Table";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import useSort from "../hooks/use-sort";

// Look at each object in the config array --> does the object have a 'sortValue' function?
// if so, this column must be sortable
// Add a 'header' property that will show a clickable header cell - when user clicks this, sort the data & pass the sortedData down to data

function SortableTable(props) {
  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );

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
          onClick={() => setSortColumn(column.label)}
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
