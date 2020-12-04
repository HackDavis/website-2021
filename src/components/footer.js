import React from "react"
import styles from "./css/footer.module.css"
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
    
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { relativeDirectory: {eq: ""} }, sort: {fields:[name] order: ASC}) {
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
        <section className={styles.footerstyle}>
            <div id="footer-content">
                <div className={styles.logo}>
                    <img src={images['Logo White']}></img>
                </div>
                <br></br>
                <a className={styles.smallbutton1} href="mailto:team@hackdavis.io">
                    <i className={`fa fa-envelope ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://medium.com/@HackDavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-medium ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://www.facebook.com/HackDavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-facebook-f ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://twitter.com/hack_davis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-twitter ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://www.instagram.com/hackdavis" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-instagram ${styles.icon}`} aria-hidden="true"></i>
                </a>
                <a className={styles.smallbutton1} href="https://discord.gg/wc6QQEc" target="_blank" rel="noopener noreferrer">
                    <i className={`fab fa-discord ${styles.icon}`} aria-hidden="true"></i>
                </a>
            </div>
            <div id="copyright">
                <span>&copy; 2021 HackDavis • Made with ☕️ & 💛 in Davis</span>
            </div>
        </section>
    )
}

export default Footer