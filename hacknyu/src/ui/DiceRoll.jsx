import React, { useState } from 'react';
import styles from './DiceRoll.module.css'; // Create this CSS module

function DiceRoll({ onRoll }) {  // Receive a callback function as a prop
    const [rollResult, setRollResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false); // State for rolling animation

    const rollDice = () => {
        setIsRolling(true); // Start animation
        const result = Math.floor(Math.random() * 6) + 1; // 1-6 roll (adjust for different dice)

        setTimeout(() => { // Simulate roll time
            setRollResult(result);
            setIsRolling(false); // Stop animation
            if (onRoll) {
                onRoll(result); // Call the callback with the result
            }
        }, 500); // Adjust delay as needed
    };

    return (
        <div className={styles.diceContainer}>
            <div className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}> {/* Apply rolling class */}
                {rollResult ? (
                    <span className={styles.rollResult}>{rollResult}</span>
                ) : (
                    <span>Roll!</span> // Initial text
                )}
            </div>
            <button onClick={rollDice} disabled={isRolling}>
                {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
        </div>
    );
}

export default DiceRoll;