import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentDiceState, currentPlayerState } from "../recoil/atoms";
import diceRollSound from "../assets/diceRoll2.mp3";

function Dice() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [diceState, setDiceState] = useRecoilState(currentDiceState);
  const currentPlayer = useRecoilValue(currentPlayerState);

  const [question, setQuestion] = useState("What is the capital of France?");
  const [options] = useState(["Paris", "London", "Berlin", "Madrid"]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  // Event handler for option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (!startTime) {
      setStartTime(Date.now());  // Start the timer on first click
    }
  };

  // Event handler for submit button
  const handleSubmit = () => {
    setEndTime(Date.now());
    setIsAnimating(true);
    new Audio(diceRollSound).play();

    // Calculate time taken
    const takenTime = (Date.now() - startTime) / 1000; // time in seconds
    setTimeTaken(takenTime);

    // Determine dice number based on time taken (example logic)
    const diceNumber = Math.max(1, 6 - Math.floor(takenTime / 2)); // Faster time gives a higher dice number

    setTimeout(() => {
      setDiceState({
        num: diceNumber,
        isLocked: true,
        lastRolledBy: currentPlayer,
      });
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div>
      <div className="question">
        <h3>{question}</h3>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedOption}
              style={{ margin: "10px", padding: "10px" }}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          style={{ marginTop: "20px", padding: "10px" }}
        >
          Submit
        </button>
      </div>
      {isAnimating && (
        <div className="dice dice-animation">
          <p>Calculating dice number...</p>
        </div>
      )}
    </div>
  );
}

export default Dice;
