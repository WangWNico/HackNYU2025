import React from 'react';
import styles from './Storybox.module.css';

function StoryBox({ text, isLoading }) {
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                {isLoading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <p className={styles.textDisplay}>{text}</p>
                )}
            </div>
        </div>
    );
}

export default StoryBox;