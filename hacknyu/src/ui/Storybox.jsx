import React from 'react';
import styles from './Storybox.module.css';

function StoryBox({ text }) { // Receive text as a prop
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <p className={styles.textDisplay}>{text}</p> {/* Display the prop */}
            </div>
        </div>
    );
}

export default StoryBox;