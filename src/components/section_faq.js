import React from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_teams.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Fade from "react-reveal/Fade"
import DropdownItem from "./objects/dropdown_item"

const FAQSection = () => {

    const faqItems = {
        "What is a hackathon?":"A hackathon is where you transform your crazy ideas into real stuff. Hundreds of hackers from across California and other parts of the U.S. form teams around an idea and collaboratively create a solution from scratch. These ideas turn into websites, mobile apps, hardware, and more! \n\nCome make the most incredible things you can imagine alongside fellow creators. You take care of building and we'll take care of you. \n\nWe will be following MLH's Code Of Conduct.",
        "Who can attend?":"HackDavis is open to all majors! As long as you're prepared to learn, brainstorm, and build cool things, we welcome you to join. We encourage participants to form teams of up to 4 people. \n\nWe will be holding workshops throughout the year for students to immerse themselves into the world of hackathons and technology. These workshops will be held by industry professionals and members of our team, who will teach new and upcoming tools that assist with web development, mobile development, and more.",
        "How can I help?":"We need mentors and volunteers to ensure a great hacker experience at our event! We will release our mentor and volunteer applications soon so keep an eye out!",
        "Why social good?":"We want people to build projects with a meaningful impact and hope to foster a community dedicated to social change. \n\nWe find that most hackathons often don’t result with projects as practical solutions to specific societal problems and we’re looking to change that.",
        "What can I build?":"You can build whatever your heart desires, whether its a web app, mobile app, hardware hack, or an open source tool. Any social good oriented project is recommended. \n\nOur main focus is to bring you a learning experience where you can have fun, ask questions, and experiment with technology.",
        "What if I don't have a team or idea?":"Don't worry! You can use our team finder that will open with applications in November! Teams will have tags describing what they plan to work on/what roles they need that you can easily search by to find a project that interests you! \n\nWe're also hosting a virtual mixer before HackDavis, so please check out our Facebook page for more announcements about that when we get closer to the time of the event.",
        "As an NPO, why should I attend?":"Because we emphasize social good in our hackathon, each year we partner with three non-profit organizations to raise awareness for issues on which they focus. Representatives come to our hackathon to help envision projects that relate to their non-profit’s goals.", 
        "When do applications open?":"Applications typically open in November!", 
    }

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
                    <Fade>
                        <div className={styles.headerText}>FAQ</div>
                        <div>
                        {/* <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>What is a hackathon?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                A hackathon is where you transform your crazy ideas into real stuff. Hundreds of hackers from across California and other parts of the U.S. form teams around an idea and collaboratively create a solution from scratch. These ideas turn into websites, mobile apps, hardware, and more! <br /><br />
                                Come make the most incredible things you can imagine alongside fellow creators. You take care of building and we'll take care of you. <br /><br />
                                We will be following MLH's Code Of Conduct.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>Who can attend?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                HackDavis is open to all majors! As long as you're prepared to learn, brainstorm, and build cool things, we welcome you to join. We encourage participants to form teams of up to 4 people. <br /><br />
                                We will be holding workshops throughout the year for students to immerse themselves into the world of hackathons and technology. These workshops will be held by industry professionals and members of our team, who will teach new and upcoming tools that assist with web development, mobile development, and more.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>How can I help?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                We need mentors and volunteers to ensure a great hacker experience at our event! We will release our mentor and volunteer applications soon so keep an eye out!
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>Why social good?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                We want people to build projects with a meaningful impact and hope to foster a community dedicated to social change. <br /><br />
                                We find that most hackathons often don’t result with projects as practical solutions to specific societal problems and we’re looking to change that.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>What can I build?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                You can build whatever your heart desires, whether its a web app, mobile app, hardware hack, or an open source tool. Any social good oriented project is recommended.<br /><br />
                                Our main focus is to bring you a learning experience where you can have fun, ask questions, and experiment with technology.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>What if I don't have a team or idea?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            Don't worry! You can use our team finder by clicking on your profile to find a team with an idea that interests you! Teams will have tags describing what they plan to work on/what roles they need that you can easily search by to find a project that interests you!<br /><br />
                            
                            We're also hosting a virtual mixer before HackDavis, so please check out our Facebook page for more announcements about that.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>How much does it cost?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                HackDavis is free for all admitted participants. Don’t sweat it! 
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>As an NPO, why should I attend?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                Because we emphasize social good in our hackathon, each year we partner with three non-profit organizations to raise awareness for issues on which they focus. Representatives come to our hackathon to help envision projects that relate to their non-profit’s goals.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>When do applications open?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                Applications typically open in late fall!
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>What are the rules?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                                We will be following MLH's <a href='http://mlh.io/code-of-conduct' target="_blank" style={{color: "lightblue"}}>Code of Conduct</a> and <a href='https://github.com/MLH/mlh-hackathon-rules' target="_blank" style={{color: "lightblue"}}>Rules</a>.
                                <br></br>
                                <br></br>
                                HackDavis may also add additional rules and guidelines for the event, which will be listed below. These are subject to change.
                                <br></br>
                                <br></br>
                                1. All work done on a submitted project must be completed during the hackathon time limits. Small bugfixes and changes are allowed after time ends before judging.
                                <br></br>
                                2. Projects submitted must only be submitted to HackDavis and no other hackathons. Submitting the same project to multiple hackathons in the same weekend is a violation of fairness.
                                <br></br>
                                <br></br>
                                <i>HackDavis reserves the right to revoke your win or win status if there is evidence of cheating or unfair advantages.</i>
                            </div>
                        </div> */}
                            {Object.keys(faqItems).map((key) => {
                                return <DropdownItem name={key} desc={faqItems[key]}></DropdownItem>;
                            })}
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default FAQSection