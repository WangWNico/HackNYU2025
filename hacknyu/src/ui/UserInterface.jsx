import React from 'react';
import styles from './UserInterface.module.css';
import CustomResponse from './CustomResponse.jsx'

function UserInterface() {
  return (
    <>
      <div className={styles.container}>
        <CustomResponse />
      </div>
    </>
  )
}

export default UserInterface;