import React from "react"
import styles from "./css/footer.module.css"

const Footer = () => {
    return (
        <div className={styles.footerstyle}>
            <div className="container-fluid-padding">
                <h5>&copy; HackDavis 2020</h5>
            </div>
        </div>
    )
}

export default Footer