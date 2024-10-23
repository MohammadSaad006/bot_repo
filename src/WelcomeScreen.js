function WelcomeScreen({ onChangeScreen }) {
    return (
        <div>
            <button onClick={() => onChangeScreen(1)}>7th standard</button>
            <button onClick={() => onChangeScreen(2)}>8th standard</button>
            <button onClick={() => onChangeScreen(3)}>9th standard</button>
        </div>
    );
}

export default WelcomeScreen;
