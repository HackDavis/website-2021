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
                            <div className={`${styles.stats}`}>
                                Join our virtual venue! Interact with other hackers on gather.town! (Opens on Jan 16)
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className={`${styles.view_winner_button_container} col-12 col-sm-12` }>
                            <a href="https://gather.town/app/4p1hbpvhjPi2eVjV/HackDavis">
                                <div className = {styles.view_winner}>
                                    GO TO VIRTUAL VENUE
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className = {`${styles.join_discord} col-12 col-sm-12`}>
                            Join our discord to speak with mentors and connect with hackers.
                        </div>
                    </div>
                    <div div className = "row no-gutters"> 
                        <div className = {`${styles.join_discord_description} col-12 col-sm-12`}>
                            Read and follow popup instructions to gain access to the server. Discord will be the fastest way to reach the HackDavis team. 
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className={`${styles.view_winner_button_container} col-12 col-sm-12` }>
                        <a href="https://discord.gg/wc6QQEc" target="_blank">
                            <div className = {styles.view_winner}>
                                    JOIN DISCORD
                            </div>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_diagonal}></div>
        </div>
    )
}

export default StatsSection