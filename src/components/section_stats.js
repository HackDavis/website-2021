import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import $ from 'jquery'
import styles from "./css/section_stats.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const StatsSection = (props) => {
    
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { relativeDirectory: {eq: "illustrations"} }, sort: {fields:[name] order: ASC}) {
          edges {
            node {
              publicURL
              name
              dir
            }
          }
        }
      }
    `)

    function GetImageMap()
    {
        const image_data = {}

        for (let i = 0; i < data.allFile.edges.length; i++)
        {
            const image_node = data.allFile.edges[i].node;
            image_data[image_node.name] = image_node.publicURL;
        }

        return image_data;
    }

    const images = GetImageMap();

    return (
        <div className = "container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <div className={`col-10 offset-1 col-md-5 offset-md-1 ${styles.image_container} ${props.fadeAbout && styles.slideinleft}`}>
                    <img className={styles.image} src={images['Illustration 1']}></img>
                </div>
                <div className={`${styles.statscontainer} ${props.fadeAbout && styles.slideinright} col-10 offset-1 col-md-4 offset-md-1`}>
                    <div className = "row no-gutters">
                        <div className= "col-12">
                            <div className={styles.header_date}>
                                January 16 - 17, 2021  |  Hosted Virtually
                            </div>
                            <div className={`${styles.stats}`}>
                                600+ HACKERS<br></br>
                                36 HOURS<br></br>
                                110+ PROJECTS<br></br>
                                $25,000+ PRIZES<br></br>
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className={`${styles.view_winner_button_container} col-12 col-sm-12` }>
                            <div className = {styles.view_winner}>
                                <a href="https://hackdavis2020.devpost.com/" target="_blank">
                                    <div className={styles.winnertext}>
                                        VIEW 2020 WINNERS
                                    </div>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_diagonal}></div>
            </div>
    )
}

export default StatsSection