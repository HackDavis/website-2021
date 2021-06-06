import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import $ from 'jquery'
import styles from "../components/css/about.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const AboutPage = () => {
    
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
                <div className={`${styles.statscontainer} col-10 offset-1 col-md-5 offset-md-1`}>
                    <div className = "row no-gutters">
                        <div className= "col-12">
                            <div className={`${styles.about_header}`}>
                                About Us
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className= "col-11"> {/* note: need to tweak paragraph size to be more accurate to Figma*/}
                            <div className={`${styles.about_text}`}>
                            HackDavis is UC Davis’ 36-hour collegiate hackathon dedicated to empowering student hackers to collaborate 
                            and build impactful projects that make the world a better place. HackDavis 2021 featured 
                            <span className={`${styles.about_text_alt}`}> 750+ student attendees </span> and 
                            <span className={`${styles.about_text_alt}`}> 150+ project submissions </span> 
                            dedicated to social good, making the event a huge success and the 
                            <span className={`${styles.about_text_alt}`}> second-largest hackathon in California. </span> 
                            We also partnered with non-profit organizations like Aging 2.0, The Children’s 
                            Scoliosis Foundation, and Breathe California to support our local communities.
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className={`${styles.view_winner_button_container} col-12 col-sm-12` }>
                            <div className = {styles.view_winner} onClick={() => window.open('mailto:team@hackdavis.io')}>
                                    SPONSOR 2022
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters align-items-end">
                        <div className= "col-3">
                            <img src={images['attendee_logo']}></img>
                        </div>
                        <div className= "col-3">
                            <img src={images['projects_logo']}></img>
                        </div>
                        <div className= "col-3">
                            <img src={images['first_time_logo']}></img>
                        </div>
                        <div className= "col-3">
                            <img src={images['gender_logo']}></img>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className= "col-3">
                            <div className = {styles.about_stats_big}>
                                750+
                            </div>
                            <div className = {styles.about_stats_small}>
                                attendees
                            </div>
                        </div>
                        <div className= "col-3">
                            <div className = {styles.about_stats_big}>
                                150+
                            </div>
                            <div className = {styles.about_stats_small}>
                                projects submitted
                            </div>
                        </div>
                        <div className= "col-3">
                            <div className = {styles.about_stats_big}>
                                40%
                            </div>
                            <div className = {styles.about_stats_small}>
                                first time hackers
                            </div>
                        </div>
                        <div className= "col-3">
                            <div className = {styles.about_stats_big}>
                                37%
                            </div>
                            <div className = {styles.about_stats_small}>
                                female or nonbinary
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-10 offset-1 col-md-4 offset-md-2 d-flex justify-content-end ${styles.image_container}`}>
                    <img className={`${styles.image}`} src={images['bunnyfloat 1']}></img>
                </div>
            </div>
            <div className={styles.bottom_diagonal}></div>
        </div>
    )
}

export default AboutPage;