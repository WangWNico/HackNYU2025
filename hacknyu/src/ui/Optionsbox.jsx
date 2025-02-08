import React from 'react';
import styles from './Optionsbox.module.css';

function OptionsBox() {
    return (
        <>
        <div className={styles.optionsBox}>
            <div className={styles.options}>
                <button className={styles.optionButton}>Option 1</button>
                <button className={styles.optionButton}>Option 2</button>
                <button className={styles.optionButton}>Option 3</button>
                <button className={styles.optionButton}>Option 4</button>
            </div>
        </div>
        </>
    )
}

export default OptionsBox;