import React, { useEffect } from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_directors.module.css"
import { useStaticQuery, graphql } from "gatsby"

const DirectorsSection = () => {

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { relativeDirectory: {eq: "directors"} }, sort: {fields:[name] order: ASC}) {
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
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Directors</div>
                    <div className={`row no-gutters`}>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["omid"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Omid<br />Co-President<br />Head Technical Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["vivek"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Vivek<br />Co-President<br />Head Sponsorship Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["cheryl"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Cheryl<br />Head Design Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["stephenie"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Stephenie<br />Head Finance Director</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                    <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["joyce"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Joyce<br />Head External Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["abhishek"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Abhishek<br />Head Operations Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["ishani"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Ishani<br />Operations Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["alex"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Alex<br />Technical Director</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["nick"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Nick<br />Technical Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["sivani"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Sivani<br />Sponsorship Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}}>
                            <div>
                                <img src={images["shachi"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Shachi<br />Sponsorship Director</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "10rem"}}>
                            <div>
                                <img src={images["barno"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Barno<br />Sponsorship Director</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_diagonal}></div>
        </div>
    )
}

export default DirectorsSection