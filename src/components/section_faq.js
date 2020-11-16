import React, { useEffect } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_faq.module.css"
import { useStaticQuery, graphql } from "gatsby"

const FAQSection = () => {

    useEffect(() => {
        $(`.${styles.qa_title}`).on("click", function () {
            console.log("press h4")
            const $button = $(this).parent().find(`div.${styles.content}`);
            if ($button.hasClass("collapse")) {
                $button.removeClass("collapse")
            }
            else {
                $button.addClass("collapse")
            }
        })

        return () => {
            $(`.${styles.qa_title}`).off("click")
        }
    })

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "dropdown"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
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
  
    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-8 offset-2'}>
                    <h2 className={styles.headerText}>Questions?</h2>
                    <div className={styles.qaText}>
                        <h4 className={styles.qa_title}>What is a hackathon?</h4>
                        {console.log(data.allFile.edges[0].node.publicURL)}
                        <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                        <hr />
                        <div className={`collapse in ${styles.content}`}>
                            A hackathon is where you transform your crazy ideas into real stuff. Hundreds of hackers from across California and other parts of the U.S. form teams around an idea and collaboratively create a solution from scratch. These ideas turn into websites, mobile apps, hardware, and more! <br /><br />
                            Come make the most incredible things you can imagine alongside fellow creators. You take care of building and we'll take care of you. <br /><br />
                            We will be following MLH's Code Of Conduct.
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQSection