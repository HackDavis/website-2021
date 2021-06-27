import React, {useState, useEffect} from 'react'
import { Link } from "gatsby"
import styles from "../components/css/about.module.css"
import $ from "jquery";
import AboutTopPage from './about_top';
import AboutBotPage from './about_bot'
import Footer from './footer'

const About = ({aboutIsOpen, setAboutIsOpen}) => {
    
    const [show, setShow] = useState(aboutIsOpen);

    useEffect(()=> {
        if (aboutIsOpen) {
            setShow(true);
        }
    }, [aboutIsOpen]);


    const onAnimationEnd = () => {
        if(!aboutIsOpen) {
            setShow(false);
        }
    };

    return (show && (
        <div className={styles.about_container} style={{animation:`${aboutIsOpen ? `${styles.appear}`:`${styles.disappear}`} 0.3s`}} onAnimationEnd={onAnimationEnd}>
            <AboutTopPage setAboutIsOpen={setAboutIsOpen}/>
            <AboutBotPage/>
            <Footer></Footer>
        </div>
        )
    );
}
export default About