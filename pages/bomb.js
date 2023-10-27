import React, { useEffect, useState } from "react";

export default function Bomb() {
  const [texts, setTexts] = useState([]);
  const [arr, setArr] = useState([]);
  const [reset, setReset] = useState(false);
  const [inc, setInc] = useState(0);
  const [num, setNum] = useState(12);
  const [higestScore, setHighestScore] = useState(0);

  const generateRandomBox = () => {
    const randomTexts = Array.from({ length: num }, () =>
      Math.random() < 0.5 ? "Safe" : "Bomb"
    );
    setTexts(randomTexts);
  };

  const handleClick = (text, i) => {
    if (reset) return;
    setArr([...arr, i]);
    setReset(text === "Bomb");
  };

  const handleReset = () => {
    setInc(inc + 1);
    setReset(false);
    setArr([]);
  };

  useEffect(() => {
    generateRandomBox();
  }, [inc, num]);

  const handleChange = (e) => {
    const val = e.currentTarget.value;
    if (arr.length === 0) setNum(val);
  };

  const handleShow = () => {
    const newArray = Array.from({ length: num }, (_, index) => index);
    setArr(newArray);
  };

  return (
    <div className="h-100 align-items-center justify-content-center d-flex">
      <div>
        <p className="text-center">Score:{arr.length}</p>
        <input type="text" id="txt" value={num} onChange={handleChange} />
        <div className="divParentColor">
          {texts.map((text, i) => (
            <div className="box" key={i} onClick={() => handleClick(text, i)}>
              {arr.includes(i) ? <p id={`box${text}`}>{text}</p> : null}
            </div>
          ))}
        </div>
        <div className="divButton">
          {reset && (
            <button className="mt-2" onClick={handleReset}>
              Reset
            </button>
          )}
          <button className="mt-2" onClick={handleShow}>
            Show
          </button>
        </div>
      </div>
    </div>
  );
}
