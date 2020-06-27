import React, { useState } from 'react';

import styles from "./css/floatinglogo.module.css"
import { Link } from "gatsby"

const FloatingLogo = ( ) => {
    return (
        <Link to="/">
            <div className={styles.floatinglogo}></div>
        </Link>
      );
}

export default FloatingLogo