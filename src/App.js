import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"; // Firestore functions
import { db } from "./firebase"; // Firebase configuration
import "./styles/App.css";
import SeventhStandard from "./components/SeventhStandard";
import EighthStandard from "./components/EighthStandard";
import NinthStandard from "./components/NinthStandard";
import Eightlanguage from "./cncScreen/eight_language";
import Ludomain from "./components/Ludomain"; // Renamed Ludo.js to Ludomain.js

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showInputBox, setShowInputBox] = useState(false); // To toggle the input box visibility
  const [newClass, setNewClass] = useState(""); // To store input value
  const [dynamicButtons, setDynamicButtons] = useState([]); // Store dynamically created buttons
  const [buttonCount, setButtonCount] = useState(0); // Store the count for the button number

  useEffect(() => {
    // Fetch existing buttons from Firebase, ordered by 'number'
    const fetchButtons = async () => {
      const q = query(collection(db, "buttons"), orderBy("number")); // Order by 'number'
      const querySnapshot = await getDocs(q);
      const buttonsFromDb = querySnapshot.docs.map((doc) => doc.data());
      setDynamicButtons(buttonsFromDb); // Set the buttons with className and number
      setButtonCount(buttonsFromDb.length); // Set the button count for the next button number
    };

    fetchButtons();
  }, []);

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
  };

  const handleAddNewClass = () => {
    setShowInputBox(true); // Show the input box when button is clicked
  };

  const handleSubmitNewClass = async () => {
    if (newClass.trim() !== "") {
      const newButtonNumber = buttonCount + 1; // Increment the button count for new button number
      // Add new class button to Firestore with className and number
      try {
        await addDoc(collection(db, "buttons"), {
          className: newClass,
          number: newButtonNumber,
        });
        setDynamicButtons([...dynamicButtons, { className: newClass, number: newButtonNumber }]); // Add new class button to state
        setButtonCount(newButtonNumber); // Update the button count
        setNewClass(""); // Reset input value
        setShowInputBox(false); // Hide input box after submission
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    transition: "background-color 0.3s, transform 0.2s",
    cursor: "pointer",
    borderRadius: "8px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
    transform: "scale(1.05)",
  };

  return (
    <div>
      {currentScreen === "home" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
            height: "100vh",
          }}
        >
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={() => handleButtonClick("seventh")}
          >
            7th standard
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={() => handleButtonClick("additionalOptions")}
          >
            8th standard
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={() => handleButtonClick("ninth")}
          >
            9th standard
          </button>
          {/* Button to add a new class */}
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={handleAddNewClass}
          >
            Add New Class
          </button>

          {/* Render dynamically created buttons ordered by their number, but only display the class name */}
          {dynamicButtons.map((button) => (
            <button
              key={button.number}
              style={buttonStyle}
              onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              onClick={() => handleButtonClick(button.className)}
            >
              {button.className} {/* Only display the class name */}
            </button>
          ))}

          {/* Show input box if Add New Class is clicked */}
          {showInputBox && (
            <div>
              <input
                type="text"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                placeholder="Enter class name or number"
                style={{ padding: "10px", marginBottom: "10px" }}
              />
              <button
                style={{ ...buttonStyle, marginLeft: "10px" }}
                onClick={handleSubmitNewClass}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
      {currentScreen === "seventh" && <SeventhStandard />}
      {currentScreen === "eighth" && <EighthStandard />}
      {currentScreen === "ninth" && <NinthStandard />}
      {currentScreen === "additionalOptions" && <Eightlanguage />} {/* Render AdditionalOptions component */}

      {/* Render Ludomain dynamically for any new class */}
      {dynamicButtons.some((button) => button.className === currentScreen) && <Ludomain />}
    </div>
  );
}

export default App;
