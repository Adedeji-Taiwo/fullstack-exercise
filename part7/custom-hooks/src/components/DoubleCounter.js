import React from "react";
import { useCounter } from "../hooks/useCounter";

const DoubleCounter = () => {
  const left = useCounter();
  const right = useCounter();
  return (
    <div>
      {left.value}
      <button onClick={left.increase}>left</button>
      <button onClick={right.increase}>right</button>
      {right.value}
    </div>
  );
};

export default DoubleCounter;
