import React, { useEffect } from "react"

import { useStaticQuery, graphql } from "gatsby"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/landing_background.module.css"
import parallaxstyles from "./css/parallax.module.css"
import { Parallax } from "react-scroll-parallax"

const LandingBackground = () => {
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { relativeDirectory: {eq: "landing"} }, sort: {fields:[name] order: ASC}) {
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
        <div className={styles.background}>
            <div className={styles.clouds_background}>
                <img src={images["Cloud 1"]} className={styles.cloud1}></img>
                <img src={images["Cloud 2"]} className={styles.cloud2}></img>
                <img src={images["Cloud 3"]} className={styles.cloud3}></img>
            </div>
            <div className={styles.right_side_container}>
                <img src={images["Layer 1-2"]}></img>
                <img src={images["Layer 2-2"]} className={styles.layer2_right}></img>
                <img src={images["Code 2"]} className={styles.code2}></img>
                <img src={images["Code 2 Arrow"]} className={styles.heart_arrow}></img>
                <img src={images["Waterfall 1"]}></img>
                <img src={images["Waterfall 2"]}></img>
            </div>
            <div className={`${styles.left_side_container}`}>
                <img src={images["Layer 1"]} className={styles.layer1_left}></img>
                <img src={images["Layer 2"]}></img>
                <img src={images["Heart"]} className={styles.heart}></img>
                <img src={images["Heart Arrow"]} className={styles.heart_arrow}></img>

            </div>
            <img src={images["Water"]} className={styles.water}></img>
            <img src={images["Glow Up Left"]} className={`${styles.glow_left} ${styles.glow_up}`}></img>
            <img src={images["Glow Down Left"]} className={`${styles.glow_left} ${styles.glow_down}`}></img>
            <img src={images["Glow Up Right"]} className={`${styles.glow_right} ${styles.glow_up}`}></img>
            <img src={images["Glow Down Right"]} className={`${styles.glow_right} ${styles.glow_down}`}></img>

            {/* { <Parallax y={["-400px", "400px"]}>
                <div className={parallaxstyles.testbox1}></div>
            </Parallax>
            <Parallax y={["-300px", "300px"]}>
                <div className={parallaxstyles.testbox2}></div>
            </Parallax> } */}
        </div>
    )
}

export default LandingBackground
