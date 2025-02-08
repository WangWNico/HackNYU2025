import React from 'react';
import styles from './Optionsbox.module.css';

function OptionsBox({ choices, onChoiceClick }) { // Receive choices and handler
    return (
        <div className={styles.optionsBox}>
            <div className={styles.options}>
                {choices.map(choice => ( // Map over choices
                    <button 
                        key={choice.number} 
                        className={styles.optionButton} 
                        onClick={() => onChoiceClick(choice)} // Call handler with choice
                    >
                        {choice.number} {choice.description}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default OptionsBox;