import React, { useState, useEffect } from 'react';
import styles from "./css/section_livestream.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player'

const LivestreamSection = (props) => {

    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters ${styles.background}`}>
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={styles.headerText}>Livestreams</div>
                    {/* idk why this is broke but documentation: https://github.com/CookPete/react-player#props */}
                    <div className={styles.player_wrapper}>
                        <ReactPlayer
                        url='https://www.youtube.com/watch?v=5qap5aO4i9A'
                        className={styles.react_player}
                        width='100%'
                        height='100%'
                        />
                    </div>
                </div>
                <div className={`col-1 col-md-2`} />
                <div className={'col-10 col-md-8 offset-1 offset-md-2'}>
                    <div className={`row no-gutters`}>
                        <div className={`col-12 col-md-6`}>
                            <div className={styles.rightpadding}>
                                <div className={styles.player_wrapper}>
                                    <ReactPlayer
                                    url='https://www.youtube.com/watch?v=5qap5aO4i9A'
                                    className={styles.react_player}
                                    width='100%'
                                    height='100%'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-md-6`}>
                            <div className = {styles.leftpadding}>
                                <div className={styles.player_wrapper}>
                                    <ReactPlayer
                                    url='https://www.youtube.com/watch?v=5qap5aO4i9A'
                                    className={styles.react_player}
                                    width='100%'
                                    height='100%'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LivestreamSection;