import React, { useEffect, useState } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_live_schedule.module.css"
import ScheduleElement from "./schedule_element"

const ScheduleSection = () => {

    const [scheduleData, setScheduleData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        $.ajax({
            cache: false,
            url: "https://raw.githubusercontent.com/HackDavis/website-2021/schedule-data/schedule.json",
            dataType: "json",
            success: function(data) {
                setScheduleData(data);
                setLoaded(true);
            }
        });
    }, true)

    return (
        <div className="container--fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Schedule
                        <div className={`row no-gutters`}>
                            <div className={`col-12`}>
                                <div className={styles.dateText}>Saturday, Jan 16</div>
                                <div>
                                {scheduleData["Saturday"] && Object.keys(scheduleData["Saturday"]).map((key) => 
                                {
                                    return <ScheduleElement loaded={loaded} time={key} data={scheduleData["Saturday"][key]}></ScheduleElement>
                                })}
                                </div>
                            </div>
                        </div>
                        <div className={`row no-gutters`}>
                            <div className={`col-12`}>
                                <div className={styles.dateText}>Sunday, Jan 17</div>
                                <div>
                                {scheduleData["Sunday"] && Object.keys(scheduleData["Sunday"]).map((key) => 
                                {
                                    return <ScheduleElement loaded={loaded} time={key} data={scheduleData["Sunday"][key]}></ScheduleElement>
                                })}
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