import React from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_sponsors.module.css"
import { useStaticQuery, graphql } from "gatsby"

const SponsorsSection = () => {
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { extension: { eq: "png"} relativeDirectory: {eq: "sponsors"} }, sort: {fields:[name] order: ASC}) {
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
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 offset-1 col-lg-8 offset-lg-2'}>
                    <div className={`row align-items-center no-gutters`}>
                        <div className="col-12" align="center">
                            <h2 className={styles.headerText}>Sponsors</h2>
                        </div>
                        <div className="col-lg-1" />
                        <div className="col-10 col-lg-5 offset-1 offset-lg-0" align="center">
                            <a href="https://www.tensorflow.org/js/">
                                <img className={styles.imageStyle} src={images["tensorflow"]} />
                            </a>
                        </div>
                        <div className="col-10 col-lg-5 offset-1 offset-lg-0" align="center">
                            <a href="https://www.confluent.io/">
                                <img className={styles.imageStyle} src={images["confluent"]} />
                            </a>
                        </div>
                        <div className="col-lg-1" />
                    </div>
                    <div className={`row align-items-center no-gutters`}>
                        <div className="col-lg-1" />
                        <div className="col-10 col-lg-5 offset-1 offset-lg-0" align="center">
                            <a href="https://www.twilio.com/">
                                <img className={styles.imageStyle} src={images["twiliologo"]} />
                            </a>
                        </div>
                        <div className="col-10 col-lg-5 offset-1 offset-lg-0" align="center">
                            <a href="https://globalaffairs.ucdavis.edu/">
                                <img className={styles.imageStyle} src={images["ucdglobalaffairs"]} />
                            </a>
                        </div>
                        <div className="col-lg-1" />
                    </div>
                    <div className={`row align-items-center no-gutters`}>
                        <div className="col-5 col-lg-3 offset-0 offset-lg-0" align="center">
                            <a href="https://contrarycap.com/">
                                <img className={styles.smallImageStyle} src={images["contrary"]} />
                            </a>
                        </div>
                        <div className="col-2 col-lg-auto" />
                        <div className="col-5 col-lg-3 offset-0 offset-lg-0" align="center">
                            <a href="https://www.sketch.com/">
                                <img className={styles.smallImageStyle} src={images["sketch"]} />
                            </a>
                        </div>
                        <div className="col-5 col-lg-3 offset-0 offset-lg-0" align="center">
                            <a href="https://lettersandscience.ucdavis.edu/">
                                <img className={styles.smallImageStyle} src={images["ucdcls"]} />
                            </a>
                        </div>
                        <div className="col-2 col-lg-auto" />
                        <div className="col-5 col-lg-3 offset-0 offset-lg-0" align="center">
                            <a href="https://ece.ucdavis.edu/">
                                <img className={styles.smallImageStyle} src={images["ucdece"]} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorsSection