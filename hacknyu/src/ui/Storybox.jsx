import React, { useState } from 'react';
import styles from './Storybox.module.css';

function StoryBox() {
  const [generatedText, setGeneratedText] = useState("Welcome Adventurers...");

  const updateGeneratedText = (newText) => {
    setGeneratedText(newText);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <p className={styles.textDisplay}>{generatedText}</p>
      </div>
    </div>
  );
}

export default StoryBox;