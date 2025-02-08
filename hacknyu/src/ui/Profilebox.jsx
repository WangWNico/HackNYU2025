import React from 'react'
import styles from './Profilebox.module.css';
import { useRef, useEffect } from "react";

const ProfileBox = ({ gender }) => {
    const pfp = useRef(null);

    useEffect(() => {
        if (pfp.current) {
            pfp.current.classList.add(styles.default);
            pfp.current.classList.remove(styles.male, styles.female);

            if (gender === "male") {
                pfp.current.classList.add(styles.male);

            } else if (gender === "female") {
                pfp.current.classList.add(styles.female);

            }
        }
    }, [gender]);

    return (<div className={styles.container}>Profilebox
        <div ref={pfp} className={styles.default}></div>
    </div>)
};

export default ProfileBox;