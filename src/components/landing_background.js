import React, { useEffect, useState } from "react"

import { useStaticQuery, graphql } from "gatsby"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/landing_background.module.css"
import parallaxstyles from "./css/parallax.module.css"
import { Parallax } from "react-scroll-parallax"
import loading_styles from "./css/loadingscreen.module.css"
import $ from "jquery"

const LandingBackground = (props) => {

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
    const num_images_to_load = Object.keys(images).length;
    let num_images_loaded = 0;

    function OnImageLoad()
    {
        num_images_loaded = num_images_to_load;

        if (num_images_loaded == num_images_to_load)
        {
            setTimeout(() => {
                props.setLoadProgress(true);
                setTimeout(() => {
                    props.setIsLoading(false);
                }, 1400);
            }, 1000);
        }
    }

    return (
    <div className={styles.background}>
        <div className={styles.clouds_background}>
                <img onLoad={OnImageLoad()} alt="" src={images["Cloud 1"]} className={styles.cloud1}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Cloud 2"]} className={styles.cloud2}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Cloud 3"]} className={styles.cloud3}></img>
            </div>
            <div className={`${styles.left_side_container}`}>
                <img onLoad={OnImageLoad()} alt="" src={images["Layer 1"]} className={styles.layer1_left}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Layer 2"]}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Heart Orb"]} className={styles.heart_orb}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Heart"]} className={styles.heart}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Heart Arrow"]} className={styles.heart_arrow}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Cow"]} className={styles.cow}></img>
            </div>
            <div className={styles.right_side_container}>
                <img onLoad={OnImageLoad()} alt="" src={images["Layer 1-2"]}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Layer 2-2"]} className={styles.layer2_right}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Code 2"]} className={styles.code2}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Code 2 Arrow"]} className={styles.heart_arrow}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Waterfall 1"]} className={styles.waterfall1}></img>
                <img onLoad={OnImageLoad()} alt="" src={images["Waterfall 2"]} className={styles.waterfall2}></img>
            </div>
            <img onLoad={OnImageLoad()} alt="" src={images["Water"]} className={styles.water}></img>
            <img onLoad={OnImageLoad()} alt="" src={images["Glow Up Left"]} className={`${styles.glow_left} ${styles.glow_up}`}></img>
            <img onLoad={OnImageLoad()} alt="" src={images["Glow Down Left"]} className={`${styles.glow_left} ${styles.glow_down}`}></img>
            <img onLoad={OnImageLoad()} alt="" src={images["Glow Up Right"]} className={`${styles.glow_right} ${styles.glow_up}`}></img>
            <img onLoad={OnImageLoad()} alt="" src={images["Glow Down Right"]} className={`${styles.glow_right} ${styles.glow_down}`}></img>
            <div className={styles.notouchy}></div>
        </div>
    )
}

export default LandingBackground
