import React from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "./css/section_directors.module.css"

const DirectorBlurb = (props) => {
	const handleClick = () => {
		window.open(props.linkedin)
	}

	const checkPresident = (name) => {
		if ((name === 'Omid') || (name === 'Vivek')) {
			return true
		}
		else {
			return false
		}
	}

	return (
		<div className={'col-12 col-md-3 membercontainer'} style={{marginBottom: props.sizing}}>
			<div>
				<img src={props.directorImage} className={styles.headshot} onClick={handleClick}/>
				<h6 className={styles.title}><br /> {props.directorName}<br /> {checkPresident(props.directorName) ? 
					<>
						Co-President 
						<br />{props.directorDesc}
					</>
					: 
					<>
						{props.directorDesc}
					</>
					}
				</h6>
			</div>
		</div>
	)
}

export default DirectorBlurb
