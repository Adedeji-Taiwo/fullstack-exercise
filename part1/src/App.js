import { useState } from "react";
import './App.css';
import Button from "./components/Button";
import History from "./components/History";
import Display from "./components/Display";

function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [value, setValue] = useState(10);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"))
    setLeft(left + 1)
  }

    const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const setToValue = (newValue) => () => {
    console.log("value now:", newValue)
    setValue(newValue)
  }

  

  return (
    <div className="App">
      <br />
      <Display value={left}/>
      <Button onClick={handleLeftClick} text = "left"/>
      <Button onClick={handleRightClick} text = "right"/>
      <Display value={right}/>
      <History allClicks={allClicks} />
      <br /><br />
      <Display value={value}/>
      <Button onClick={setToValue(1000)} text = "thousand"/>
      <Button onClick={setToValue(0)} text = "reset"/>
      <Button onClick={setToValue(value + 1)} text ="increment"/>
    </div>
  );
}

export default App;


