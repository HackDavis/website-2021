import React, { useEffect } from 'react';
import Modal from "./modal"
import styles from "./css/modal_profile.module.css"
import { getUser } from "../utils/auth"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// User's interest, technologies, application status, teams, 

const ProfileModal = ( props ) => {
    const user = getUser();
    const { displayName, email } = user;

    return(
        <Modal {...props} id="profilemodal">
            <div className={styles.modal}>
                <Container fluid p-0 noGutters={true}>
                    <Row lg={12}>
                        <Col xs={12} noGutters={true}>
                            <div class={`${styles.title} ${styles.red}`}>Hello, {displayName}!</div>
                        </Col>
                    </Row>
                    <Row lg={6}>
                        <Col xs={6} noGutters={true}>
                            <Col>
                                <div className={styles.applicationcontainer}>Application Container</div>
                            </Col>
                            <Col>
                                <div className={styles.teamfindercontainer}>Team Finder Container</div>
                            </Col>
                        </Col>
                    </Row>
                    <Row lg={6}>
                        <Col xs={6}>
                            <div className={styles.badgescontainer}>Badges Container</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Modal>
            
    ); 
}

export default ProfileModal