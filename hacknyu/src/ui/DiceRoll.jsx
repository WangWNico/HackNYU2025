import React, { useState } from 'react';
import styles from './DiceRoll.module.css';
import dice1 from '../assets/dice1.png';
import dice2 from '../assets/dice2.png';
import dice3 from '../assets/dice3.png';
import dice4 from '../assets/dice4.png';
import dice5 from '../assets/dice5.png';
import dice6 from '../assets/dice6.png';

function DiceRoll({ onRoll }) {
    const [rollResult, setRollResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [diceImage, setDiceImage] = useState(null); // State for the image

    const diceImages = { // Object to map results to images
        1: dice1,
        2: dice2,
        3: dice3,
        4: dice4,
        5: dice5,
        6: dice6,
    };

    const rollDice = () => {
        setIsRolling(true); // Start animation
        const result = Math.floor(Math.random() * 6) + 1; // 1-6 roll

        setTimeout(() => {
            setRollResult(result);
            setDiceImage(diceImages[result]);
            setIsRolling(false); // Stop animation
            if (onRoll) {
                onRoll(result); // Call the callback with the result!
            }
        }, 500);
    };
    
    return (
        <div className={styles.diceContainer}>
            <div className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}>
                {diceImage && <img src={diceImage} alt={`Dice Roll: ${rollResult}`} className={styles.diceImage} />} {/* Show image */}
                {!diceImage && <span>Roll!</span>} {/* Show "Roll!" if no image yet */}
            </div>
            <button onClick={rollDice} disabled={isRolling}>
                {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
        </div>
    );
}

export default DiceRoll;