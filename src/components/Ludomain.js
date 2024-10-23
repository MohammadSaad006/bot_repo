import React from "react";
import GameSetup from "./gameSetup";
import HomeBox from "./homeBox"; // Assuming you have these components
import StepsGrid from "./stepsGrid";
import HomeCenter from "./homeCenter";

const Ludomain = () => {
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
        </div>
    );
};

export default Ludomain;
