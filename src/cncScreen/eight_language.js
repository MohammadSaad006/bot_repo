import React from 'react';

const Eightlanguage = () => {
    const handleButtonClick = (option) => {
        alert(`You selected: ${option}`);
    };

    const buttonStyle = {
        backgroundColor: "#007BFF",
        border: "none",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        margin: "10px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 0.3s, transform 0.2s",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
        transform: "scale(1.05)",
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100vh' }}>
            <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={() => handleButtonClick('Option 1')}
            >
                English
            </button>
            <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={() => handleButtonClick('Option 2')}
            >
                Maths
            </button>
            <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={() => handleButtonClick('Option 3')}
            >
                Science
            </button>
        </div>
    );
};
export default Eightlanguage;
