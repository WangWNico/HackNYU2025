import React from 'react';
import styles from './CustomResponse.module.css';

function CustomResponse({ input, setInput, response, handleGenerate }) { // Receive props
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <textarea
          className={styles.textArea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your action..."
          rows="5"
          style={{ resize: 'none' }}
        />
      </div>
      <button className={styles.optionButton} onClick={handleGenerate}>
        Generate
      </button>
      <p>{response}</p>
    </div>
  );
}

export default CustomResponse;