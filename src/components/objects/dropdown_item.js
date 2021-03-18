import React, { useEffect } from "react"
import $ from "jquery"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/section_teams.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Fade from "react-reveal/Fade"

const DropdownItem = (props) => {

	useEffect(() => {
		$(`.${styles.qaText}`).on("click", function () {
		  // need a way to loop through every other button and detect if it's open, and then close it first if so
		  const $button = $(this).find(`div.${styles.content}`)
		  if ($button.hasClass(styles.collapse_height)) {
			$button.removeClass(styles.collapse_height)
			$(this).find("img").addClass(styles.img_collapse)
			// need a way to trigger a fade in animation for the text - jQuery's built in animation functions don't work here
		  } else {
			$button.addClass(styles.collapse_height)
			$(this).find("img").removeClass(styles.img_collapse)
		  }
		})
	
		return () => {
		  $(`.${styles.qaText}`).off("click")
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
		<Fade>
			<div className={styles.qaText}>
				<h4 className={styles.qaTitle}>{props.name}</h4>
				<img
					className={styles.dropdown_image}
					src={data.allFile.edges[0].node.publicURL}
				/>
				<div className={`${styles.collapse_height} ${styles.content}`}>
				{props.desc}
				</div> 
			</div>
		</Fade>
	)
}

export default DropdownItem