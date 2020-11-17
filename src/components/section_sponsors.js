import React from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_sponsors.module.css"
import sponsor1517 from "../images/sponsors/1517fund.png"
import sponsorCentene from "../images/sponsors/centene.png"
import sponsorGCP from "../images/sponsors/gcp.png"

const SponsorsSection = () => {
  
    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 offset-1 col-xl-8 offset-xl-2'}>
                    <h2 className={styles.headerText}>Sponsors</h2>
                    <div className="row align-items-center no-gutters">
                        <div className="col-12" align="center">
                            <h4 className={styles.labelText}>Co-Hosted by</h4>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <a href="https://www.1517.org/">
                                <img className={styles.imageStyle} src={sponsor1517} />
                            </a>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle} src={sponsorGCP} />
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle}src={sponsorCentene} />
                        </div>
                    </div>
                    <div className="row align-items-center no-gutters">
                        <div className="col-12" align="center">
                            <h4 className={styles.labelText}>2021 Partners</h4>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <a href="https://www.1517.org/">
                                <img className={styles.imageStyle} src={sponsor1517} />
                            </a>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle} src={sponsorGCP} />
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle}src={sponsorCentene} />
                        </div>
                    </div>
                    <div className="row align-items-center no-gutters">
                        <div className="col-12" align="center">
                            <h4 className={styles.labelText}>2021 Non-Profits</h4>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <a href="https://www.1517.org/">
                                <img className={styles.imageStyle} src={sponsor1517} />
                            </a>
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle} src={sponsorGCP} />
                        </div>
                        <div className="col-10 col-md-4 offset-1 offset-md-0" align="center">
                            <img className={styles.imageStyle}src={sponsorCentene} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorsSection