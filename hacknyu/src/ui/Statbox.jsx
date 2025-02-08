import React from 'react'
import styles from './Statbox.module.css';

function Statbox() {
    const [hp, setHp]= useState(5);
    const [attack, setAttack]=useState(2);
    const [moveSpeed, setMoveSpeed]=useState(2);

  return (
    <div className={styles.container}>
        Stats
        <div className={styles.hp}></div>
        <div className={styles.attack}></div>
        <div className={styles.moveSpeed}></div>
    </div>
  )
}

export default Statbox