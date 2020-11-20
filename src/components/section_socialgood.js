import React from "react"

import styles from "./css/section_socialgood.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useStaticQuery, graphql } from "gatsby"

const SocialGoodSection = (props) => {

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
        <div className="container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <div className={`col-10 offset-1 col-md-4 offset-md-1 order-2 order-md-1 ${styles.description} ${props.fadeSocialGood && styles.slideinleft}`}>
                    <div className= {styles.title}>
                        Hack for Social Good
                    </div>
                    With the rapid advancement of technology, it is important to use its power in ways that benefit society. HackDavis challenges 
                    its participants to hack for social good, and create an opportunity for us to explore the intersection between technology and society.
                    <br></br>
                    <br></br>
                    On January 16-17, over 700 students, hackers, and creators will come together virtually for 36 hours of hacking. 
                    For the 6th year in a row, we're bringing the most talented students in California (and beyond!) to address the world’s most pressing issues.
                </div>
                <div className={`${styles.social_good_container} ${props.fadeSocialGood && styles.slideinright} col-10 offset-1 col-md-5 offset-md-1 order-1 order-md-2`}>
                    <img className={styles.image} src={images['Illustration 2']}></img>
                </div>
            </div>
            <div className={styles.bottom_diagonal}></div>
        </div>
    )
}

export default SocialGoodSection