import React, { useEffect } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_teams.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Fade from "react-reveal/Fade"

const TeamSection = () => {
  useEffect(() => {
    $(`.${styles.qaTitle}, .${styles.dropdown_image}`).on("click", function () {
      // need a way to loop through every other button and detect if it's open, and then close it first if so
      const $button = $(this).parent().find(`div.${styles.content}`)
      if ($button.hasClass(styles.collapse_height)) {
        $button.removeClass(styles.collapse_height)
        $(this).parent().find("img").addClass(styles.img_collapse)
        // need a way to trigger a fade in animation for the text - jQuery's built in animation functions don't work here
      } else {
        $button.addClass(styles.collapse_height)
        $(this).parent().find("img").removeClass(styles.img_collapse)
      }
    })

    return () => {
      $(`.${styles.qaTitle}`).off("click")
    }
  })

  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { name: { eq: "newdropdown" }, extension: { eq: "svg" } }
        sort: { fields: [name], order: ASC }
      ) {
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
        <div className={"col-10 col-md-8 offset-1 offset-md-2"}>
          <Fade>
            <div className={styles.headerText}>Teams</div>
            <div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>External Affairs</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for people who are passionate about social good
                  and have great communication skills to join the external team.
                  You’ll be involved in the efforts to incorporate social good
                  in HackDavis, which is the theme of our hackathon. In doing
                  so, you’ll be responsible for building relationships with
                  nonprofits, organizing a network of judges for the day of the
                  event, and partnering with organizations within UC Davis and
                  other universities to organize workshops and activities.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Finance</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for detail-oriented people who want to obtain
                  hands-on experience managing finances for a large-scale event.
                  Working closely with the sponsorship team, we’ve carefully
                  managed over $200,000 in sponsor funds and grants in the past
                  few years. You’ll get hands-on experience with project
                  management, budgeting, grant application, invoicing, and
                  serving as the point of contact with sponsors and vendors for
                  payment logistics.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Marketing</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for great communicators who are passionate about
                  marketing and looking to gain experience in advertising for a
                  distinguished hackathon. You’ll get to handle all public
                  relations and social media accounts for our hackathon, as well
                  as lead the creation and implementation of marketing
                  strategies, receiving real-time feedback on your strategies.
                  Working in our marketing team allows you to handle tasks
                  ranging from authoring Medium articles and handing outreach
                  with campus organizations and other universities, to updating
                  our social media accounts and planning the entire marketing
                  process to drive more turnout to our event and workshops than
                  ever before.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Sponsorship</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for great communicators who want experience in
                  networking and making pitches to join the sponsorship team. In
                  the last few years, we’ve successfully raised more than
                  $200,000 and partnered with school departments and companies
                  like Google, Amazon, Intel, and IBM. You’ll be the face of
                  HackDavis and serve as the point of contact for our
                  sponsorship deals, and will be able to increase your
                  professional network by forming relationships with campus
                  leadership, recruiters, developer advocates, and other company
                  representatives.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Design</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for designers who want to gain hands-on skills
                  in graphic design, digital marketing, and creating clean web
                  experiences. You will work cross-functionally in a
                  multi-project environment and gain valuable experience
                  supporting social media strategy, building a brand identity,
                  and synthesizing the creative vision for HackDavis. Your
                  concepts will go live through our website, social media, and
                  branded swag.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Technical</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for software developers to work on technical
                  projects for HackDavis, including the website, application
                  system, tech workshops, and our judging app, among others. You
                  will also collaborate with the design team to bring HackDavis’
                  creative vision to life. If you are looking to gain hands-on
                  experience with a variety of interesting technologies such as
                  ReactJS, Node, Firebase, and more, this is the team to join.
                </div>
              </div>
              <div className={styles.qaText}>
                <h4 className={styles.qaTitle}>Operations</h4>
                <img
                  className={styles.dropdown_image}
                  src={data.allFile.edges[0].node.publicURL}
                />

                <div className={`${styles.collapse_height} ${styles.content}`}>
                  We’re looking for organized and responsible individuals to
                  bring the whole vision of HackDavis into reality through
                  planning the logistics of the actual event, including securing
                  the venue, setting up WiFi, and arranging for food. Through
                  this team, you will learn how to smoothly plan an event of
                  700+ attendees and communicate with several different vendors,
                  school organizations, and Major League Hacking. You will also
                  work with many of the other teams throughout the process to
                  make sure things are going to run smoothly on the big day.
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default TeamSection
