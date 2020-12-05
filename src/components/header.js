import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import {isLoggedIn,logout } from "../services/auth"
import { navigate } from "../../.cache/gatsby-browser-entry"

const checkUser = () => {
  if (isLoggedIn()){
    logout()
  }
  navigate('/login')
}

const Header = ({ siteTitle }) => (


      <header
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
          className={'d-flex align-items-center justify-content-around'}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>

          </h1>
          <div onClick={checkUser}>
            <div className={isLoggedIn() ? 'btn btn-danger' : 'btn btn-primary'}>{isLoggedIn() ? 'Logout' : 'Login'}</div> <br />
          </div>
        </div>
      </header>


)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
