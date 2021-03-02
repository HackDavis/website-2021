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
            console.log(image_node.name, image_node.publicURL)
            image_data[image_node.name] = image_node.publicURL;
        }

        return image_data;
    }


    const directorInfo = 
        {
        "Omid": {description: `Technical Lead`, linkedin: `https://www.linkedin.com/in/omidmogasemi/`},
        "Vivek": {description: `Sponsorship Lead`, linkedin: `https://www.linkedin.com/in/vivekshome/`},
        "Cheryl": {description: `Design Lead`, linkedin: `https://www.linkedin.com/in/cherylcai/`},
        "Stephenie": {description: `Finance Lead`, linkedin: `https://www.linkedin.com/in/stepheniecho/`},
        "Joyce": {description: `External Lead`, linkedin: `https://www.linkedin.com/in/joyce-lu-b8b96b197/`},
        "Abhishek": {description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/abhishekhandigol/`},
        "Ishani": {description: `Operations Co-Lead`, linkedin: `https://www.linkedin.com/in/ishani-pandya/`},
        "Alex": {description: `Technical`, linkedin: `https://www.linkedin.com/in/alelong/`},
        "Nick": {description: `Technical`, linkedin: `https://www.linkedin.com/in/nickjsulist/`},
        "Sivani": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sivani-voruganti/`},
        "Shachi": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/shachichampaneri/`},
        "Barno": {description: `Sponsorship`, linkedin: `https://www.linkedin.com/in/sabarno/`},
        }
    function adjustSizing(index) {
        if (index == Object.keys(directorInfo).length - 1) {
            return "22rem";
        }
        return "3rem";
    }

    const images = GetImageMap();

    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Directors</div>
                    <div className={`row no-gutters`}>
                        {Object.keys(directorInfo).map((key, index) => {
                            return <DirectorBlurb sizing={adjustSizing(index)}directorImage={images[key]} directorName={key} directorDesc={directorInfo[key].description} linkedin={directorInfo[key].linkedin}></DirectorBlurb>;
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.bottom_diagonal}></div>
        </div>
    )
}

export default DirectorsSection
