import React from 'react'
import styles from './Statbox.module.css';

function Statbox({stats}) {
return (
    <div className={styles.container}>
        <div className={styles.values}>
            ❤️{stats[0]}<br />
            💪{stats[1]}<br />
            👟{stats[2]}<br />
        </div>
    </div>
)
}

export default Statbox