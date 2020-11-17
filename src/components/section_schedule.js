import React from "react"

import styles from "./css/section_schedule.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"



const ScheduleSection = () => {
    return (
        <div className={`container-fluid p-0`}>
            <div className={`row no-gutters align-items-center ${styles.main_container}`}>
                <div className='col-12'>
                    <div className={`row no-gutters ${styles.title_container}`}>
                        <div align="left" className='col-10 offset-1 col-md-8 offset-md-2'>
                            <h2>Schedule</h2>
                        </div>
                    </div>
                    <div className={`row no-gutters align-items-center`}>
                        <div className={`col-10 col-md-3 offset-1 offset-md-2 ${styles.day_container}`}>
                            <div className={`row no-gutters`}>
                                <div className={styles.day}>
                                    SATURDAY
                                </div>
                            </div>
                            <div className='row no-gutters'>
                                <div className={`col-4 ${styles.time_container}`}>
                                    <div className={styles.time}>
                                        9:00 am <br></br>
                                        11:00 am <br></br>
                                        12:00 pm <br></br>
                                        <br></br>
                                        7:00 pm <br></br>
                                    </div>
                                </div>
                                <div className={`col-8 col-md-8 ${styles.event_text_container}`}>
                                    <div className={styles.event_text}>
                                        Check-in begins <br></br>
                                        Opening Ceremony <br></br>
                                        Hacking Begins <br></br>
                                        Lunch <br></br>
                                        Dinner <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col-10 col-md-3 offset-1 offset-md-2 ${styles.day_container}`}>
                            <div className={`row no-gutters`}>
                                <div className={`${styles.day} ${styles.sunday}`}>
                                    SUNDAY
                                </div>
                            </div>
                            <div className='row no-gutters'>
                                <div className={`col-4 ${styles.time_container}`}>
                                    <div className={styles.time}>
                                        11:30 am <br></br>
                                        6:00 pm <br></br>
                                        <br></br>
                                        7:30 pm <br></br>
                                        9:45 pm <br></br>
                                    </div>
                                </div>
                                <div className={`col-8 col-md-8 ${styles.event_text_container}`}>
                                    <div className={styles.event_text}>
                                        Lunch <br></br>
                                        Hacking Ends <br></br>
                                        Dinner <br></br>
                                        Demos <br></br>
                                        Closing Ceremony <br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleSection