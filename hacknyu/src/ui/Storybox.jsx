import React from 'react';
import styles from './Storybox.module.css';

function StoryBox() {
    const generatedText = "This is the computer-generated text. It can be long and will wrap automatically.  It can contain multiple lines and will expand the box vertically as needed."
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