import React from "react"
import Layout from "../../components/layout"
import { getUser } from "../../services/auth"
import { Link } from "gatsby"
import { navigate } from "../../../.cache/gatsby-browser-entry"
import AgencyImage from "../../images/agency.jpg"
import ClientImage from "../../images/client.jpg"

const ChooseUserTypePage = () => {
  const { data } = getUser()
  if (!data) {
    navigate("/login")
    return <div></div>
  }
  return (
    <Layout>
      <div
        className={"d-flex justify-content-around align-items-center"}
        style={{ fontSize: "4rem", color: "#5a10c9" }}
      >
        <b>Who Are You?</b>
      </div>
      <div
        className={"d-flex justify-content-around align-items-center"}
        style={{ height: "70vh" }}
      >
        <Link
          className="link"
          to={
            data.user.roles.indexOf("CLIENT") !== -1
              ? "/home/type/client"
              : "/register/user/client"
          }
          className={"shadow-lg p-5 text-dark"}
          style={{ borderRadius: "2rem" }}
        >
          <img
            className="home-image"
            style={{ width: "20vw", height: "40vh" }}
            src={ClientImage}
          ></img>
          <h1 className={"text-center"} style={{ color: "#5a10c9" }}>
            Customer
          </h1>
          <p>
            {data.user.roles.indexOf("CLIENT") !== -1
              ? "Checkout your user home"
              : "By clicking this you are registering yourself as customer"}
          </p>
        </Link>
        <Link
          className="link"
          to={
            data.user.roles.indexOf("AGENCIES") !== -1
              ? "/home/type/agency"
              : "/register/user/agency"
          }
          className={"shadow-lg p-5 text-dark"}
          style={{ borderRadius: "2rem" }}
        >
          <img
            className="home-image"
            style={{ width: "30vw", height: "40vh" }}
            src={AgencyImage}
          ></img>
          <h1 className={"text-center"} style={{ color: "#5a10c9" }}>
            Agency
          </h1>
          <p>
            {data.user.roles.indexOf("AGENCIES") !== -1
              ? "Checkout your agency home"
              : "By clicking this you are registering yourself as agency"}
          </p>
        </Link>
      </div>
    </Layout>
  )
}

export default ChooseUserTypePage
