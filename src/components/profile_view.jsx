import React from "react"
import PropTypes from "prop-types"
import styles from "./css/profile_view.module.css"

const ProfileView = ({ title, children }) => (
  <div className={styles.ProfileView}>
    <div className="w-full bg-gray-100 rounded px-8 pt-6 pb-8 mb-4 styles">
      <div className="w-1/3"></div>
      <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 md:mx-24 lg:mx-64">
        <h1 className="text-lg font-bold">{title}</h1>

        <div className="my-8">
          {children}
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  </div>
)

ProfileView.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ProfileView