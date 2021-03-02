import React, { useEffect } from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_directors.module.css"
import { useStaticQuery, graphql } from "gatsby"
import DirectorBlurb from "./director_blurb"

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


    // const directorInfo = 
    //     {
    //     "Omid": {description: `Technical Lead`, linkedin: `https://www.linkedin.com/in/omidmogasemi/`},
    //     "Vivek": {description: `Sponsorship Lead`, linkedin: `https://www.linkedin.com/in/vivekshome/`},
    //     "Cheryl": {description: `Design Lead`, linkedin: `https://www.linkedin.com/in/cherylcai/`},
    //     "Stephenie": {description: `Finance Lead`, linkedin: `https://www.linkedin.com/in/stepheniecho/`},
    //     "Joyce": {description: `External Lead`, linkedin: `https://www.linkedin.com/in/joyce-lu-b8b96b197/`},
    //     "Abhishek": {description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/abhishekhandigol/`},
    //     "Ishani": {description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/ishani-pandya/`},
    //     "Alex": {description: `Technical`, linkedin: `https://www.linkedin.com/in/alelong/`},
    //     "Nick": {description: `Technical`, linkedin: `https://www.linkedin.com/in/nickjsulist/`},
    //     "Sivani": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sivani-voruganti/`},
    //     "Shachi": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/shachichampaneri/`},
    //     "Barno": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sabarno/`},
    //     }
    // function adjustSizing(index) {
    //     if (index == Object.keys(directorInfo).length - 1) {
    //         return "22rem";
    //     }
    //     return "3rem";
    // }

    const images = GetImageMap();

    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Directors</div>
                    <div className={`row no-gutters`}>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["omid"]} className={styles.headshot} style={{borderRadius: "10px"}} onClick={() => window.open("https://www.linkedin.com/in/omidmogasemi/")}/>
                                <h6 className={styles.title}><br />Omid<br />Co-President<br />Lead Technical</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}}>
                            <div>
                                <img src={images["vivek"]} className={styles.headshot} style={{borderRadius: "10px"}} onClick={() => window.open("https://www.linkedin.com/in/vivekshome/")}/>
                                <h6 className={styles.title}><br />Vivek<br />Co-President<br />Lead Sponsorship</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}} onClick={() => window.open("https://www.linkedin.com/in/cherylcai/")}>
                            <div>
                                <img src={images["cheryl"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Cheryl<br />Lead Design</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}} onClick={() => window.open("https://www.linkedin.com/in/stepheniecho/")}>
                            <div>
                                <img src={images["stephenie"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Stephenie<br />Lead Finance</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                    <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "3rem"}} onClick={() => window.open("https://www.linkedin.com/in/joyce-lu-b8b96b197/")}>
                            <div>
                                <img src={images["joyce"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Joyce<br />Lead External</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/abhishekhandigol/")}>
                            <div>
                                <img src={images["abhishek"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Abhishek<br />Co-Lead Operations</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/ishani-pandya/")}>
                            <div>
                                <img src={images["ishani"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Ishani<br />Co-Lead Operations</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/alelong/")}>
                            <div>
                                <img src={images["alex2"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Alex<br />Technical</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`row no-gutters`}>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/nickjsulist/")}>
                            <div>
                                <img src={images["nick"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Nick<br />Technical</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/sivani-voruganti/")}>
                            <div>
                                <img src={images["sivani"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Sivani<br />Sponsorship</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "1.25rem"}} onClick={() => window.open("https://www.linkedin.com/in/shachichampaneri/")}>
                            <div>
                                <img src={images["shachi"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Shachi<br />Sponsorship</h6>
                            </div>
                        </div>
                        <div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: "22rem"}} onClick={() => window.open("https://www.linkedin.com/in/sabarno/")}>
                            <div>
                                <img src={images["barno"]} className={styles.headshot} style={{borderRadius: "10px"}} />
                                <h6 className={styles.title}><br />Barno<br />Sponsorship</h6>
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