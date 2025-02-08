import React from 'react';
import styles from './UserInterface.module.css';
import Profilebox from './Profilebox';
import Statbox from './Statbox';

function UserInterface() {
  return (
    <div> hello
       <Profilebox />
       {/*<Statbox />*/}
    </div>
  )
}

export default UserInterface;