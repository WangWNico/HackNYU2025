import React from 'react';
import styles from './UserInterface.module.css';
import Optionsbox from './Optionsbox.jsx'
import Storybox from './Storybox.jsx'

function UserInterface() {
  return (
    <>
      <Storybox />
      <Optionsbox />
    </>
  )
}

export default UserInterface;