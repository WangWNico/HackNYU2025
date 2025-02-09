import React from 'react'
import styles from './Statbox.module.css';

function Statbox({stats}) {
  return (
    <div className= {styles.container}>
        <div className={styles.values}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                    {stat}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Statbox