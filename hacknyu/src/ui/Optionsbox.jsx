import React from 'react';
import styles from './Optionsbox.module.css';

function OptionsBox({ choices, onChoiceClick }) {
    return (
        <div className={styles.optionsBox}>
            <div className={styles.options}> {/* options div always renders */}
                {choices.map(choice => (
                    <button
                        key={choice.number}
                        className={styles.optionButton}
                        onClick={() => onChoiceClick(choice)}
                    >
                        {choice.number} {choice.description}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default OptionsBox;