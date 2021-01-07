import React, { useEffect } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useStaticQuery, graphql } from "gatsby"
import PrizeDropdown from "./prize_dropdown"
import styles from "./css/section_faq.module.css"

const prizes1 = 
{
    "Best Hack for Social Good": "You can win this by creating an awesome hack geared towards social good! Each member of the winning team gets a Nintendo Switch.",
    "Best Beginner Hack": "This must be every team member's first hackathon! Each member of the winning team gets a Smart TV.",
    "Best Interdisciplinary Hack": "At least one member of your team must not be a Computer Science (or similar) major! Each member of the winning team gets a Fitbit.",
    "Best Global Hack": "Best Global Hack goes to the team that offers a way to address one or more of the 17 <a href='https://www.un.org/sustainabledevelopment/sustainable-development-goals/' style={{'textDecoration': 'underline'}}>UN Sustainable Development Goals</a> and goes to the best project by a team of hackers from multiple (at least 2) time zones.! Each member of the winning team gets an Amazon Kindle.",
}

const prizes2 = 
{
    "Best Use of TensorFlow.js": "Use TensorFlow.js in your project! Each member of the winning team gets a Pixel 4A smart phone.",
    "Best Use of Twilio API": "Use the Twilio API in your project! Each member of the winning team gets a Logitech Webcam.",
    "Best Use of Confluent Platforms": "Use Confluent Platforms in your project! Winning team gets a $500 Amazon Gift Card.",
    "Best Pitch with Contrary": "Attend the Contrary event on Sunday to be eligible. Winning team gets a $500 cash prize."
}

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
                        <div className={`col-12 col-md-6`}>
                            <div className={styles.rightpadding}>
                                {Object.keys(prizes1).map((key) => {
                                    return <PrizeDropdown name={key} description={prizes1[key]}></PrizeDropdown>;
                                })}
                            </div>
                        </div>
                        <div className={`col-12 col-md-6 ${styles.leftpadding}`}>
                            <div className={styles.leftpadding}>                            
                                {Object.keys(prizes2).map((key) => {
                                    return <PrizeDropdown name={key} description={prizes2[key]}></PrizeDropdown>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrizeSection