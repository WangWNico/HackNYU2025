import React from 'react'
import styles from './Statbox.module.css';

function Statbox({stats}) {
  return (
    <div className= {styles.container}>
        <div className={styles.values}>
            
            <text>  
                {stats[0]}
            {stats[1]}
            {stats[2]}</text>
        </div>
    </div>
  )
}

export default Statbox