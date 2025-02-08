import React from 'react';
import styles from './UserInterface.module.css';
import Optionsbox from './Optionsbox.jsx'
import Storybox from './Storybox.jsx'
import CustomResponse from './CustomResponse.jsx'

function UserInterface() {
  return (
    <>
      <div className={styles.container}>
        <Storybox />
        <Optionsbox />
        <CustomResponse />
      </div>
    </>
  )
}

export default UserInterface;