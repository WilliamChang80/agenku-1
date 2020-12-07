import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { isLoggedIn, logout } from "../services/auth"
import { navigate } from "gatsby-link"
import { handleGet, handlePost } from "../services/request"

const checkUser = () => {
  if (isLoggedIn()) {
    logout()
  }
  typeof window !== "undefined" && navigate("/login")
}

const Header = ({ siteTitle }) => {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    const q = e.target.value
    setQuery(query)
    q.length !== 0
      ? setTimeout(() => {
          handleGet(`/services/search?query=${q}`, true).then(res =>
            setResult(res.data)
          )
        }, 200)
      : setResult([])
  }

  const renderData = () => {
    return (
      !!result?.products && (
        <div
          style={{
            backgroundColor: "white",
            zIndex: "999",
            position: "absolute",
            height: "50vh",
            overflowY: "scroll",
            width: "100vw",
            marginTop: "60vh",
          }}
        >
          <div className="products">
            {!!result?.products && (
              <h2>
                <b>Services</b>
              </h2>
            )}
            {result?.products?.map(p => (
              <div key={p.id}>{p.name}</div>
            ))}
          </div>
          {!!result?.agencies && (
            <h2>
              <b>Agencies</b>
            </h2>
          )}
          <div className="agencies">
            {result?.agencies?.map(p => (
              <Link to={`/home/profile/agency`} state={{ id: p.id }}>
                <div key={p.id}>{p.name}</div>
              </Link>
            ))}
          </div>
          {!!result?.serviceTypes && (
            <h2>
              <b>Service Type</b>
            </h2>
          )}
          <div className="serviceTypes">
            {result?.serviceTypes?.map(p => (
              <div key={p.id}>{p.name}</div>
            ))}
          </div>
        </div>
      )
    )
  }

  return (
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
        className={"d-flex align-items-center justify-content-around"}
      >
        {renderData()}
        <h1 style={{ margin: 0 }}>
          <Link
            to="/home"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div
          className={"d-flex justify-content-around align-items-center w-100"}
        >
          <input
            name="search"
            type="text"
            placeholder={"Search your keyword"}
            onChange={handleSubmit}
            style={{
              width: "20vw",
              borderRadius: "1rem",
              fontSize: "1.3rem",
              paddingLeft: "1rem",
            }}
          />
          <Link to={"/home"} className={"text-white"}>
            <b>Home</b>
          </Link>
          {isLoggedIn() && (
            <>
              <Link to={"/home/my-profile"} className={"btn text-white"}>
                <b> Profile</b>
              </Link>
            </>
          )}
          <div onClick={checkUser}>
            <div
              className={isLoggedIn() ? "btn btn-danger" : "btn btn-primary"}
            >
              {isLoggedIn() ? "Logout" : "Login"}
            </div>
            <br />
          </div>
        </div>
      </div>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
