import React from 'react';
import styles from './UserInterface.module.css';
import CustomResponse from './CustomResponse.jsx'

function UserInterface() {
  return (
    <>
      <div className={styles.container}>
        <CustomResponse />
        <Profilebox />
       {/*<Statbox />*/}
      </div>
    </>
  )
}

export default UserInterface;