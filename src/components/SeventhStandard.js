import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil"; // Import Recoil hooks
import { currentDiceState } from "../recoil/atoms"; // Import your Recoil atom for the dice state
import GameSetup from "./gameSetup"; // Import your GameSetup component
import HomeCenter from "./homeCenter";
import StepsGrid from "./stepsGrid";
import HomeBox from "./homeBox";

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        question: "What is the color of the sky?",
        options: ["Blue", "Green", "Red", "Yellow"],
        answer: "Blue",
    },
    // Add more questions as needed
];

const SeventhStandard = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [diceNumber, setDiceNumber] = useState(null);
    const [diceState, setDiceState] = useRecoilState(currentDiceState);

    // Get current question and options
    const { question, options } = questions[currentQuestionIndex];

    // Start timing when the question is displayed
    useEffect(() => {
        setStartTime(Date.now());
    }, [currentQuestionIndex]);

    // Calculates dice number based on time taken
    const calculateDiceNumber = () => {
        const timeTaken = endTime - startTime; // Time in milliseconds
        const number = Math.ceil((timeTaken / 1000) * 6 / 30); // Adjust based on time taken
        setDiceNumber(Math.min(number, 6)); // Set the dice number between 1 and 6
    };

    // Event handler for option click
    const handleOptionClick = (option) => {
        console.log("Selected option:", option);
        setEndTime(Date.now());
    };

    // Event handler for submit
    const handleSubmit = () => {
        if (endTime) {
            calculateDiceNumber();
            setSubmitted(true);

            // Update the dice state with the calculated dice number
            setDiceState({ num: diceNumber, isLocked: true, lastRolledBy: "player" }); // or currentPlayer

            // Move to the next question after a brief delay
            setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) =>
                    prevIndex + 1 < questions.length ? prevIndex + 1 : 0 // Loop back to the first question
                );
                setSubmitted(false); // Reset the submitted state for the next question
                setEndTime(null); // Reset end time for the next question
            }, 2000); // Change delay as needed
        }
    };

    return (
        <div>
            <GameSetup />
            <div className="App">
                <div className="boardWrapper">
                    <div className="innerRow">
                        <HomeBox parent="palegreen" />
                        <StepsGrid parent="yellow" adjacentDirection="leftOrTop" />
                        <HomeBox parent="yellow" />
                    </div>
                    <div className="innerRow">
                        <StepsGrid style={{ transform: "rotate(90deg)" }} parent="palegreen" adjacentDirection="rightOrBottom" />
                        <HomeCenter />
                        <StepsGrid style={{ transform: "rotate(90deg)" }} parent="royalblue" adjacentDirection="leftOrTop" />
                    </div>
                    <div className="innerRow">
                        <HomeBox parent="tomato" />
                        <StepsGrid parent="tomato" adjacentDirection="rightOrBottom" />
                        <HomeBox parent="royalblue" />
                    </div>
                </div>
            </div>

            {/* Question and Options Section - Displayed Below the Game Board */}
            <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", borderTop: "1px solid #ccc" }}>
                <h3>{question}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{ padding: "10px", borderRadius: "5px", background: "lightblue", border: "none", cursor: "pointer" }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "5px", background: "green", color: "white", border: "none", cursor: "pointer" }}
                >
                    Submit
                </button>
                {submitted && (
                    <h2>Dice Number: {diceNumber}</h2>
                )}
            </div>
        </div>
    );
};

export default SeventhStandard;
