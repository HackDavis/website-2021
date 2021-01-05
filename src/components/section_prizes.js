import React, { useEffect } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useStaticQuery, graphql } from "gatsby"
import PrizeDropdown from "./prize_dropdown"
import styles from "./css/section_faq.module.css"


const PrizeSection = () => {

    useEffect(() => {
        $(`.${styles.prizeName}`).on("click", function () {
            // need a way to loop through every other button and detect if it's open, and then close it first if so 
            const $button = $(this).parent().find(`div.${styles.prizeDesc}`);
            if ($button.hasClass(styles.collapseHeight)) {
                $button.removeClass(styles.collapseHeight)
                $(this).parent().find('img').addClass(styles.imgCollapse)
                // need a way to trigger a fade in animation for the text - jQuery's built in animation functions don't work here 
            }
            else {
                $button.addClass(styles.collapseHeight)
                $(this).parent().find('img').removeClass(styles.imgCollapse)
            }
        })

        return () => {
            $(`.${styles.prizeName}`).off("click")
        }
    })

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "newdropdown"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
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
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Prizes</div>
                    <div className={`row no-gutters`}>
                        <div className={`col-6`} style={{"paddingRight": "10px"}}>
                            <PrizeDropdown name={"Test Prize 123"} description={"You can win this prize by using the HackDavis API in your project! Nintendo switch!"}></PrizeDropdown>
                            <PrizeDropdown name={"Test Prize 123"} description={"You can win this prize by using the HackDavis API in your project! Nintendo switch!"}></PrizeDropdown>
                        </div>
                        <div className={`col-6`} style={{"paddingLeft": "10px"}}>
                            <PrizeDropdown name={"Test Prize 123 Big Long Title hehe"} description={"You can win this prize by using the HackDavis API in your project! Nintendo switch!"}></PrizeDropdown>
                            <PrizeDropdown name={"Test Prize 123"} description={"You can win this prize by using the HackDavis API in your project! Nintendo switch!"}></PrizeDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrizeSection