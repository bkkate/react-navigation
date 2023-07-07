// demo component for reusable hooks

import Button from "../components/Button";
import useCounter from "../hooks/use-counter";

function CounterPage({ initialCount }) {
  const { count, increment } = useCounter(initialCount); // will return an object with count & handleClick properties

  return (
    <div>
      <h1>Count is {count}</h1>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
}

export default CounterPage;
