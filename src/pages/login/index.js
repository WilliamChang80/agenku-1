import React, { useState } from "react"
import { Link } from "gatsby"
import { isLoggedIn, login } from "../../services/auth"
import GoogleLogin from "react-google-login"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import LoginImage from "../../images/login.jpg"
import Style from "./login.module.scss"
import { navigate } from "../../../.cache/gatsby-browser-entry"

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
  })

  const [passwordShown, setPasswordShown] = useState(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const cred = { email: state.email, password: state.password }
    const promise = await login(cred)
    const { message, code } = promise
    if (code === 200) {
      navigate("/home")
    } else {
      setState(prevState => ({ ...prevState, message }))
    }
  }

  const handleChange = e => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value,
    }))
  }

  if (isLoggedIn()) {
    navigate(`/home`)
    return <div></div>
  } else {
    return (
      <div
        className={"row no-gutters"}
        style={{ backgroundColor: "#faebd7", height: "100vh" }}
      >
        <div className={"col-lg-6"} style={{ backgroundColor: "#008b8b" }}>
          <div
            className={"position-absolute"}
            style={{ width: "600px", height: "400px", top: "5%", left: "20%" }}
          >
            <img
              style={{ width: "40vw", marginTop: "10vh", marginRight: "50vw" }}
              src={LoginImage}
            />
          </div>
        </div>
        <div className={"col-lg-6"}>
          <div
            className={
              "d-flex flex-column justify-content-center h-100 align-items-center"
            }
          >
            <div className={"w-50"}>
              <h1 className={"fa-4x font-weight-bold"}>Hello,</h1>
              <h1 className={"fa-3x font-weight-bold"}>Welcome to Agenku!</h1>
              <form>
                <div
                  style={
                    state.message === ""
                      ? { display: "none" }
                      : { visibility: "visible" }
                  }
                  className={"alert alert-danger"}
                >
                  {state.message}
                </div>
                <div className={"d-flex flex-column"}>
                  <label htmlFor={"email"}>E-mail</label>
                  <div>
                    <input
                      name={"email"}
                      id={"email"}
                      type={"email"}
                      value={state.email}
                      className={Style.input + " w-100"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={"d-flex flex-column mt-3"}>
                  <label htmlFor={"password"}>
                    Password{" "}
                    <div
                      className={`toggle-password fa ${
                        passwordShown ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={() => togglePassword()}
                    />
                  </label>

                  <input
                    name={"password"}
                    id={"password"}
                    type={passwordShown ? "text" : "password"}
                    value={state.password}
                    className={Style.input + " w-100"}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={"text-right font-weight-light"}
                  style={{ letterSpacing: "1px" }}
                >
                  <Link to={"/forgot-password"}>
                    <sub>Forgot your password?</sub>
                  </Link>
                </div>
                <button
                  type={"submit"}
                  id={"submit"}
                  onClick={handleSubmit}
                  className={
                    " my-3 d-flex align-items-center justify-content-center w-100"
                  }
                  style={{
                    backgroundColor: "#daa520",
                    height: "50px",
                    border: "none",
                  }}
                >
                  <div
                    className={
                      "d-flex w-100 justify-content-between align-items-center"
                    }
                  >
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className={"text-white font-weight-bold"}>Login</span>
                    <span
                      className={"p-2 d-flex"}
                      style={{
                        backgroundColor: "transparent",
                        transform: "translate(-100%,0)",
                      }}
                    >
                      <i
                        style={{ color: "white" }}
                        className={"font-weight-light fa  fa-arrow-right"}
                      ></i>
                    </span>
                  </div>
                </button>
              </form>
              <div className={"d-flex align-items-center"}>
                <hr width={"45%"} className={Style.garis} />
                <span className={"mx-3"}>Or</span>
                <hr width={"45%"} className={Style.garis} />
              </div>
              <div className={"d-flex justify-content-around my-4"}>
                <div>ini button gogole</div>
              </div>
              <div className={"text-center"}>
                Don't have an account? <Link to={"/register"}>sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
