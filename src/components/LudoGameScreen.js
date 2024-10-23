import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import HomeCenter from './homeCenter';
import StepsGrid from './stepsGrid';
import HomeBox from './homeBox';
import GameSetup from './gameSetup';

function LudoGameScreen() {
    // State to track when the button is clicked
    const [showLudo, setShowLudo] = useState(null);

    // Handlers for the buttons
    const handleWelcomeClick = () => {
        setShowLudo("first");
    };

    const handleSecondGameClick = () => {
        setShowLudo("second");
    };

    const handleThirdGameClick = () => {
        setShowLudo("third");
    };

    return (
        <View style={styles.container}>
            {showLudo === null ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleWelcomeClick} style={styles.standardButton}>
                        <Text style={styles.buttonText}>7th standard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSecondGameClick} style={styles.standardButton}>
                        <Text style={styles.buttonText}>8th standard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleThirdGameClick} style={styles.standardButton}>
                        <Text style={styles.buttonText}>9th standard</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <GameSetup />
                    <View style={styles.boardWrapper}>
                        <View style={styles.innerRow}>
                            <HomeBox parent="palegreen" />
                            <StepsGrid parent="yellow" adjacentDirection="leftOrTop" />
                            <HomeBox parent="yellow" />
                        </View>
                        <View style={styles.innerRow}>
                            <StepsGrid
                                style={{ transform: 'rotate(90deg)' }}
                                parent="palegreen"
                                adjacentDirection="rightOrBottom"
                            />
                            <HomeCenter />
                            <StepsGrid
                                style={{ transform: 'rotate(90deg)' }}
                                parent="royalblue"
                                adjacentDirection="leftOrTop"
                            />
                        </View>
                        <View style={styles.innerRow}>
                            <HomeBox parent="tomato" />
                            <StepsGrid parent="tomato" adjacentDirection="rightOrBottom" />
                            <HomeBox parent="royalblue" />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    standardButton: {
        backgroundColor: '#6a11cb',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    boardWrapper: {
        width: '90%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
    },
    innerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
});

export default LudoGameScreen;
