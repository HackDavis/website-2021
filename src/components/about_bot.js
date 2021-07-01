import React, { useEffect } from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/aboutbot.module.css"
import { useStaticQuery, graphql } from "gatsby"
import DirectorBlurb from "./objects/director_blurb"
import Fade from 'react-reveal/Fade'

const AboutBotPage = () => {

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


    const directorInfo = 
        {
        "omid": {name:"Omid", description: `Technical Lead`, linkedin: `https://www.linkedin.com/in/omidmogasemi/`},
        "vivek": {name:"Vivek", description: `Sponsorship Lead`, linkedin: `https://www.linkedin.com/in/vivekshome/`},
        "cheryl": {name:"Cheryl", description: `Design Lead`, linkedin: `https://www.linkedin.com/in/cherylcai/`},
        "stephenie": {name:"Stephenie", description: `Finance Lead`, linkedin: `https://www.linkedin.com/in/stepheniecho/`},
        "joyce": {name:"Joyce", description: `External Lead`, linkedin: `https://www.linkedin.com/in/joycelu17/`},
        "abhishek": {name:"Abhishek", description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/abhishekhandigol/`},
        "ishani": {name:"Ishani", description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/ishani-pandya/`},
        "nick": {name:"Nick", description: `Technical`, linkedin: `https://www.linkedin.com/in/nickjsulist/`},
        "alex": {name:"Alex",description: `Technical`, linkedin: `https://www.linkedin.com/in/alelong/`},
        "justin": {name:"Justin", description: `Technical`, linkedin: `https://www.linkedin.com/in/justin-godfrey-rusit-5a2327196/`},
        "trishna": {name:"Trishna", description: `Technical`, linkedin: `https://www.linkedin.com/in/trishnasharma/`},
        "sivani": {name:"Sivani", description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sivani-voruganti/`},
        "shachi": {name:"Shachi", description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/shachichampaneri/`},
        "barno": {name:"Barno", description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sabarno/`},
        "rachel": {name:"Rachel", description: `Design`, linkedin: `https://www.linkedin.com/in/rachelyapp/`},
        "fajar": {name:"Fajar", description: `Design`, linkedin: `https://www.linkedin.com/in/fajar-akhter/`},
        "alyson": {name:"Alyson", description: `Finance`, linkedin: `https://www.linkedin.com/in/alyson-lee-5214501b4/`},
        "shounak": {name:"Shounak", description: `External`, linkedin: `https://www.linkedin.com/in/shounakranabhor`},
        "ashwin": {name:"Ashwin", description: `Operations`, linkedin: `https://www.linkedin.com/in/ashwin-ramakrishna-5713a51b7/`},
        }
    function adjustSizing(index) {
        if (index == Object.keys(directorInfo).length - 1) {
            return "19rem";
        }
        return "3rem";
    }

    const images = GetImageMap();

    return (
            <div className="container-fluid p-0">
                <div className={`row no-gutters ${styles.background}`}>
                    <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                        <Fade>
                            <div className={styles.headerText}>Directors</div>
                                <div className={styles.description}>
                                    a blurb about the fact that we're all students trying to work for a common goal
                                </div>
                                <div className={`row no-gutters`}>
                                    {Object.keys(directorInfo).map((key, index) => {
                                        return <DirectorBlurb sizing={adjustSizing(index)}directorImage={images[key]} directorName={directorInfo[key].name} directorDesc={directorInfo[key].description} linkedin={directorInfo[key].linkedin}></DirectorBlurb>;
                                    })}
                                </div>
                        </Fade>
                    </div>
                </div>
            </div>
    )
}

export default AboutBotPage