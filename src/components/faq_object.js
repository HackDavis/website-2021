// import React, { useEffect } from "react"
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import styles from "./css/section_faq.module.css"
// import { useStaticQuery, graphql } from "gatsby"
// import React from 'react'

// // const data = useStaticQuery(graphql`
// // {
// // 	allFile(filter: { name: {eq: "newdropdown"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
// // 	  edges {
// // 		node {
// // 		  publicURL
// // 		  name
// // 		  dir
// // 		}
// // 	  }
// // 	}
// //   }
// // `)

// const faqObject = (props) => {
// 	return (
// 	<div className={styles.qaText}>
// 		<h4 className={styles.qa_title}>{props.faqTitle}</h4>
// 		<img className={styles.dropdownImage} src={data.allFile.edges[0].node.publicURL} />
		
// 		<div className={`${styles.collapseHeight} ${styles.content}`}>
// 			{props.faqContent}
// 		</div>
// 	</div>
// 	)
// }

// export default faqObject
 