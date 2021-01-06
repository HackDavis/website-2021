import React from 'react'
import styles from "./css/count_down_block.module.css"

const CountDownBlock = (props) => {
    return (
        <div className={styles.block}>
            <div className={styles.header}> {props.header}</div>
            <div className={styles.time}>36</div>
        </div>
    )
}

export default CountDownBlock

