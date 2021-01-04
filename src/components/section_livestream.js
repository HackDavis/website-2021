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
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <ReactPlayer
                            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                            width='100%'
                            height='50%'
                    />
                </div>
            </div>
        </div>
    )
};

export default LivestreamSection;