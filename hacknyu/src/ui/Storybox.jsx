import React from 'react';
import styles from './Storybox.module.css';

function StoryBox() {
    const generatedText = "Welcome Adventurers..."
    return (
        <>
        <div className={styles.container}>
            <div className={styles.textBox}>
                <p className={styles.textDisplay}>{generatedText}</p>
            </div>
        </div>
        </>
    )
}

export default StoryBox;