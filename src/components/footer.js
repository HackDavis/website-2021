import React from "react"
import styles from "./css/footer.module.css"
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";

const Footer = () => {
    return (
        <section className={styles.footerstyle}>
            <svg width="80" height="81" viewBox="0 0 80 81" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.0925 40.5447V29.0489L0 53.1577L5.69304 58.9712L24.0925 40.5447ZM78.9903 33.3606C77.2001 24.339 70.4602 17.5978 69.6843 16.8462L53.1211 0L43.6566 9.47126L42.9836 10.1443V21.6387L53.0737 11.5418L62.4935 21.1214L63.9303 22.5826L64.0332 22.6828C64.0508 22.7004 64.6656 23.3003 65.5309 24.3363C67.3009 26.4569 70.119 30.4058 71.0209 34.9423C72.3642 41.7188 73.04 49.6178 65.5309 59.2421V71.1238C66.2392 70.5103 66.6834 70.0702 66.8432 69.9091C73.5613 63.3101 77.6104 56.6366 79.2192 49.5094C80.6153 43.3289 79.8868 37.8769 78.9903 33.3606ZM28.8336 68.8406L28.579 68.716L28.4557 68.6768C28.277 68.5914 27.6067 68.2421 26.3649 67.3442C25.7514 66.8987 24.9958 66.3191 24.0925 65.5702C22.7261 64.4354 21.0198 62.9133 18.9384 60.8833L14.2814 56.1274L8.5355 61.8733L13.1655 66.5994L13.2278 66.6631C20.3956 73.667 24.079 75.6671 25.4359 76.2237C30.3503 78.5827 34.9694 79.7013 39.1742 80.0222C41.5075 80.201 43.7135 80.1333 45.7705 79.8949C45.9465 79.8746 46.1226 79.8529 46.2973 79.8299V71.5923C41.3802 72.4374 35.4461 72.046 28.8336 68.8406Z" fill="white"/>
            <path d="M38.921 14.2096V63.2816H28.1551V24.9836L29.2371 23.9002L29.8167 23.322L33.0695 20.0665L35.2741 17.8592L35.9919 17.1414L38.1978 14.9327L38.921 14.2096Z" fill="white"/>
            <path d="M61.4683 25.1841V74.1573C61.4209 74.1884 61.3735 74.2196 61.3248 74.2507C60.8305 74.5689 60.3037 74.8912 59.7485 75.2108C59.5657 75.3165 59.3802 75.4221 59.1892 75.5277C58.6895 75.8053 58.1682 76.0802 57.6251 76.3497C57.1241 76.5989 56.6041 76.844 56.0664 77.081C55.7739 77.2096 55.4774 77.3356 55.174 77.4615C54.784 77.6213 54.3805 77.7784 53.9647 77.9314C53.6411 78.0519 53.3107 78.167 52.9721 78.2808C52.3058 78.5069 51.6111 78.7182 50.8866 78.9146C50.7133 78.962 50.5373 79.0066 50.3599 79.0513V25.1841H61.4683Z" fill="white"/>
            <path d="M50.3599 38.1139H38.921V49.2237H50.3599V38.1139Z" fill="white"/>
            </svg>
            <div id="footer-content">
                <a className={styles.smallbutton1} href="mailto:team@hackdavis.io">
                    <i className={`fa fa-envelope ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://medium.com/@HackDavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-medium ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://www.facebook.com/HackDavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-facebook-f ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://twitter.com/hack_davis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-twitter ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://www.instagram.com/hackdavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-instagram ${styles.icon}`} aria-hidden="true"></i>
                </a>
            </div>
            <div id="copyright">
                <span>&copy; 2021 HackDavis • Made with ☕️ & 💛 in Davis</span>
            </div>
        </section>
    )
}

export default Footer