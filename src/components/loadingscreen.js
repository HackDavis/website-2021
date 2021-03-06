import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/loadingscreen.module.css"

const LoadingScreen = (props) => {

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { relativeDirectory: {eq: "avatars"} }, sort: {fields:[name] order: ASC}) {
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
        <div className={`${styles.background} ${props.loadProgress && styles.opacity_anim}`}>
            <div className={styles.pageTransform}>
                <h4 className={`${styles.loadingText}`} >LOADING...</h4>
                <img className={styles.cowImage} src={images["Cow"]} />
                <div className={styles.loadingbar_outside}>
                    <div className={`${styles.loadingbar_inside} ${props.loadProgress && styles.loadingbar_inside_full}`}></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
