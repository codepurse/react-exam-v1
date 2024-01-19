import React, { useEffect, useState } from "react";

export default function Bomb() {
  const [texts, setTexts] = useState([]);
  const [arr, setArr] = useState([]);
  const [reset, setReset] = useState(false);
  const [inc, setInc] = useState(0);
  const [num, setNum] = useState(12);
  const [higestScore, setHighestScore] = useState(0);
  const [disabledScore, setDisableScore] = useState(false);

  const generateRandomBox = () => {
    const randomTexts = Array.from({ length: num }, () =>
      Math.random() < 0.5 ? "Safe" : "Bomb"
    );
    setTexts(randomTexts);
  };

  const handleClick = (text, i) => {
    if (reset) return;
    setArr([...arr, { id: i, txt: text }]);
    setReset(text === "Bomb");
  };

  const handleReset = () => {
    setInc(inc + 1);
    setReset(false);
    setArr([]);
    setDisableScore(false);
  };

  useEffect(() => {
    generateRandomBox();
  }, [inc, num]);

  const handleChange = (e) => {
    const val = e.currentTarget.value;
    if (arr.length === 0) setNum(val);
  };

  useEffect(() => {
    if (arr.length > higestScore && !disabledScore)
      setHighestScore(arr.filter((item) => item.txt === "Safe").length);
  }, [arr]);

  const handleShow = () => {
    setReset(true);
    setDisableScore(true);
    const newArray = texts.map((text, index) => ({ id: index, txt: text }));
    setArr(newArray);
  };

  return (
    <div className="h-100 align-items-center justify-content-center d-flex">
      <div>
        <p className="text-center">
          Score: {arr.filter((item) => item.txt === "Safe").length} Highest
          Score: {higestScore}
        </p>
        <input type="text" id="txt" value={num} onChange={handleChange} />
        <div className="divParentColor">
          {texts.map((text, i) => (
            <div className="box" key={i} onClick={() => handleClick(text, i)}>
              {arr.some((item) => item.id === i) ? (
                <p id={`box${text}`}>{text}</p>
              ) : null}
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
