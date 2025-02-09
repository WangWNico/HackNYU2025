import React, { useState, useRef, useEffect } from 'react';
import styles from './DiceRoll.module.css';

function DiceRoll({ onRoll }) {
    const [rollResult, setRollResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const diceRef = useRef(null);

    const rollDice = () => {
        setIsRolling(true);
        setRollResult(null);

        const result = Math.floor(Math.random() * 6) + 1;

        if (diceRef.current) {
            diceRef.current.classList.remove(styles.dice1, styles.dice2, styles.dice3, styles.dice4, styles.dice5, styles.dice6);

            // Generate random rotations for each axis (X, Y, Z)
            const randomX = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
            const randomY = Math.floor(Math.random() * 360) + 720;
            const randomZ = Math.floor(Math.random() * 360) + 360; // At least 1 full rotation


            setTimeout(() => {
                diceRef.current.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`; // Apply the random rotation

                setTimeout(() => {
                    diceRef.current.classList.add(styles[`dice${result}`]); // Show the final face
                    setRollResult(result);
                    setIsRolling(false);
                    if (onRoll) {
                        onRoll(result);
                    }
                }, 1000); // Animation duration
            }, 10);
        }
    };

    return (
        <div className={styles.diceContainer}>
            <div ref={diceRef} className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}>
                {/* No need to display the number directly on the dice */}
            </div>
            <button onClick={rollDice} disabled={isRolling}>
                {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
            {rollResult && <p>You rolled a {rollResult}</p>} {/* Display result below */}
        </div>
    );
}

export default DiceRoll;