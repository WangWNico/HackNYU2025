import React from 'react';
import styles from './CustomResponse.module.css';

function CustomResponse({ input, setInput, onSubmit }) {
    return (
        <div className={styles.container}>
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
            <button className={styles.optionButton} onClick={onSubmit}> {/* Call onSubmit */}
                Submit Custom Response
            </button>
        </div>
    );
}

export default CustomResponse;