import React from 'react';
import styles from './CustomResponse.module.css';

function CustomResponse({ input, setInput, onSubmit }) {
    return (
        <div className={styles.customResponse}>
            <div className={styles.textBox}>
                <textarea
                    className={styles.textArea}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your custom action..."
                    rows="3"
                    style={{ resize: 'none' }}
                />
            </div>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default CustomResponse;