import React, { useState, useEffect } from 'react';
import arrow from "./css/section_faq.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import { useStaticQuery, graphql } from "gatsby"
import styles from "./css/section_faq.module.css"

const PrizeDropdown = (props) => {

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
            <div className={`row no-gutters align-items-center`} >
                <div className={`${styles.card}`}>
                    <div className={`col-12`}>
                        <div className={`row no-gutters align-items-center ${styles.prizeName}`}>
                            <div className="col-11">
                                {props.name}
                            </div>
                            <div className="col-1">
                                <img className={arrow.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: props.description}} className={`${styles.prizeDesc} ${styles.collapseHeight}`}>
                            {/* {props.description} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PrizeDropdown;