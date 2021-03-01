import React, { useEffect } from "react"
import $ from "jquery"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_faq.module.css"
import { useStaticQuery, graphql } from "gatsby"

const FAQSection = () => {

    useEffect(() => {
        $(`.${styles.qa_title}, .${styles.dropdownImage}`).on("click", function () {
            // need a way to loop through every other button and detect if it's open, and then close it first if so 
            const $button = $(this).parent().find(`div.${styles.content}`);
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
            $(`.${styles.qa_title}`).off("click")
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
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>Who can apply?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            Any UC Davis undergraduate student can apply to be a HackDavis Director! We welcome all majors and all experience levels.
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>Why join HackDavis? </h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            HackDavis is so much more than just a 36-hour hackathon - there’s hundreds of hours of preparation that go into making the event as great as it can be, as well as creating supplemental items like pre-event workshops and some other great stuff we have planned for this upcoming year 😉. 
                            <br/><br/>If you want to join a community of like-minded, motivated people who want to both better themselves and create an event that will have lasting positive impacts for hundreds of other students, we’d love to have you 💖. 
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>What exactly does a HackDavis Director do?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            A HackDavis Director’s responsibilities vary from team to team (see the team descriptions above), but in general, a director is expected to participate during the day of the hackathon, attend regularly scheduled club-wide meetings, and put their best foot forward to create both a positive community of directors and an amazing event for our hackers. 
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>How does the application process work?</h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            After you submit your application, the HackDavis Team will review it and choose if you proceed to our first-round interview.
                            <br/><br/>At your first-round interview, you’ll meet with two HackDavis Directors who will ask general questions and determine the top team you’re suited for.
                            <br/><br/>If you proceed to our second-round interview, you’ll meet with your potential future team, who will ask more team-specific questions.
                            <br/><br/>After your second-round interview, you’ll hear from us if you’ve been accepted :)
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>How do I choose a team to apply for? </h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            While you can apply to as many teams as you’d like, we encourage you to think carefully about where your skills fit in with each team, and which tasks you’d enjoy spending time doing. 
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>Can I apply for a team even if I don’t have any experience? </h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            Yes! While we’d like members of each team to be familiar with the soft skills required for each team, there are no hard requirements. Above all else, we want motivated team players who want to build a great event for other students. 
                            <br/><br/>We’ll also provide you with any resources or knowledge you might need to help your team when you first join, so no one will be behind. 
                                
                            </div>
                        </div>
                        <div className={styles.qaText}>
                            <h4 className={styles.qa_title}>How much of a time commitment is HackDavis? </h4>
                            <img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            
                            <div className={`${styles.collapseHeight} ${styles.content}`}>
                            Unfortunately, this isn’t an easy question to answer. It varies greatly from team to team, as well as on the time of year. For instance, our Marketing team won’t do much work during the summer, while others like Sponsorship will be hard at work securing funding for our event. 
                            <br/><br/>While we expect everyone to be available for the duration of the actual event itself, we can’t give firm estimates for every team here. If you’d like more specifics, feel free to email us at hello@hackdavis.io or to ask us in your first-round interview if you qualify. 
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQSection