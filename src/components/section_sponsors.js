import React from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_sponsors.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Fade from "react-reveal/Fade"
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
                    <Fade>
                        <div className={`row align-items-center no-gutters`}>
                            <div className="col-12" align="center">
                                <h2 className={styles.headerText}>2022 Sponsors and Partners</h2>
                            </div>
                            <div className="col-10 col-lg-8 offset-1 offset-lg-2" align="center">
                                <a href="https://www.fordfund.org/" target="_blank">
                                    <img className={styles.imageStyle} src={images["FMC"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-4" align="center">
                                <a href="https://mtx.gg/">
                                    <img className={styles.imageStyle} src={images["matrix"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-2" align="center">
                                <a href="https://lettersandscience.ucdavis.edu/">
                                    <img className={styles.imageStyle} src={images["ucdl&s"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-1" align="center">
                                <a href=" https://ucdavisstores.com/home/">
                                    <img className={styles.imageStyle} src={images["ucdavisstore"]} />
                                </a>
                            </div>
                            <div className="col-12" align="center">
                                <h2 className={styles.headerText}>2021 Sponsors</h2>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-2" align="center">
                                <a href="https://cloud.google.com/" target="_blank">
                                    <img className={styles.imageStyle} src={images["gcp"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-0" align="center">
                                <a href="https://www.tensorflow.org/js/" target="_blank">
                                    <img className={styles.imageStyle} src={images["tensorflow_new"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-2" align="center">
                                <a href="https://www.confluent.io/" target="_blank">
                                    <img className={styles.imageStyle} src={images["confluent"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-4 offset-1 offset-lg-0" align="center">
                                <a href="https://www.twilio.com/" target="_blank">
                                    <img className={styles.imageStyle_twilio} src={images["twiliologo"]} />
                                </a>
                            </div>
                        </div>
                        <div className={`row align-items-center no-gutters`}>
                            <div className="col-5 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://contrarycap.com/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["contrary"]} />
                                </a>
                            </div>
                            <div className="col-5 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://www.sketch.com/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["sketch"]} />
                                </a>
                            </div>
                            <div className="col-5 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://www.digitalocean.com/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["digitalocean"]} />
                                </a>
                            </div>
                            
                            <div className="col-5 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href={`https://www.stickermule.com/unlock?ref_id=0539570701&utm_source=sponsorship&utm_campaign=mlh-sponsorship-2019&utm_medium=referral`} target="_blank">
                                    <img className={styles.smallImageStyle} src={images["stickermule"]} />
                                </a>
                            </div>
                        </div>
                    </Fade>
                </div>
                    <div className={`col-10 offset-1 col-lg-8 offset-lg-2 ${styles.sponsor_offset}`}>
                        <Fade>
                            <div className="col-12" align="center">
                                    <h2 className={styles.headerText}>2021 Partners</h2>
                            </div>
                            <div className={`row align-items-center no-gutters`}>
                                <div className="col-10 col-lg-4 offset-1 offset-lg-0" align="center">
                                    <a href="https://mlh.io/">
                                        <img className={styles.imageStyle_twilio} src={images["mlh"]} />
                                    </a>
                                </div>
                                <div className="col-10 col-lg-4 offset-1 offset-lg-0" align="center">
                                    <a href="http://citris.ucdavis.edu/">
                                        <img className={styles.imageStyle} src={images["citris"]} />
                                    </a>
                                </div>
                                <div className="col-10 col-lg-4 offset-1 offset-lg-0" align="center">
                                    <a href="https://globalaffairs.ucdavis.edu/">
                                        <img className={styles.imageStyle} src={images["ucdglobalaffairs"]} />
                                    </a>
                                </div>
                                <div className="col-5 col-lg-4 offset-1 offset-lg-1" align="center">
                                    <a href="https://lettersandscience.ucdavis.edu/">
                                        <img className={styles.smallImageStyle} src={images["ucdcls"]} />
                                    </a>
                                </div>
                                <div className="col-5 col-lg-4 offset-1 offset-lg-2" align="center">
                                    <a href="https://ece.ucdavis.edu/">
                                        <img className={styles.smallImageStyle} src={images["ucdece"]} />
                                    </a>
                                </div>
                            </div>
                        </Fade>
                    </div>
                <div className={`col-10 offset-1 col-lg-8 offset-lg-2 ${styles.sponsor_offset}`}>
                    <Fade>
                        <div className="col-12" align="center">
                            <h2 className={styles.headerText} style={{"marginBottom": "0"}}>2021 Non-Profits</h2>
                        </div>
                        <div className={`row align-items-center no-gutters`}>
                            <div className="col-10 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://gamersoutreach.org/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["gamersoutreach"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://www.greenbelt.org/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["greenbelt"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://www.pawswithacause.org/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["paws"]} />
                                </a>
                            </div>
                            <div className="col-10 col-lg-3 offset-1 offset-lg-0" align="center">
                                <a href="https://sacbreathe.org/" target="_blank">
                                    <img className={styles.smallImageStyle} src={images["breathe"]} />
                                </a>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default SponsorsSection