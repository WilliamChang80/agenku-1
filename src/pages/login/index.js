import React, { useState } from "react"
import {Link} from "gatsby"
import {Redirect} from "@reach/router"
import { isLoggedIn, login } from "../../services/auth"
import GoogleLogin from "react-google-login"
import {FacebookLogin} from "react-facebook-login"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Image from "../../components/image"
import Style from './login.module.scss'
import { navigate } from "../../../.cache/gatsby-browser-entry"

const LoginPage = () =>{
  const [state,setState] = useState({
    email : "",
    password : "",
    message : ""
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cred = {email : state.email, password : state.password}
    const promise = await login(cred);
    const {message,status} = promise;
    if(status === 200){
      navigate('/');
    }else{
      setState(prevState => ({ ...prevState,message : "message gagalnya" }))
    }
  }


  const handleChange = (e) => {
    const {id, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  if (isLoggedIn()){
    navigate(`/home`);
  }else{
    return (
      <div className={'row no-gutteras'} style={{backgroundColor : '#faebd7', height: '100vh'}}>
        <div className={'col-lg-6'} style={{backgroundColor: '#008b8b'}}>
          <div className={'position-absolute'} style={{width: '600px', height : '400px', top: '5%',left: '20%'}}>
            <Image/>
          </div>
        </div>
        <div className={'col-lg-6'}>
          <div className={'d-flex flex-column justify-content-center h-100 align-items-center'}>
            <div className={'w-50'}>
              <h1 className={'fa-4x font-weight-bold'}>Hello!</h1>
              <form>
                <div style={state.message === "" ? {display: 'none'} : {visibility : "visible"} } className={'alert alert-danger'}>
                  {state.message}
                </div>
                <div className={'d-flex flex-column'}>
                  <label htmlFor={'email'}>E-mail</label>
                  <div>
                    <input name={'email'} id={'email'} type={'email'} value={state.email} className={Style.input + ' w-100'} onChange={handleChange}/>
                  </div>
                </div>

                <div className={'d-flex flex-column mt-3'}>
                  <label htmlFor={'password'}>Password</label>
                  <div>
                    <input name={'password'} id={'password'}  type={'password'} value={state.password} className={Style.input +' w-100'} onChange={handleChange}/>
                  </div>
                </div>
                <div className={'text-right font-weight-light'} style={{letterSpacing : '1px'}}>
                  <Link to={'/forgot-password'}><sub>Forgot your password?</sub></Link>
                </div>
                  <div id={'submit'} onClick={handleSubmit} className={' my-3 d-flex align-items-center justify-content-center'} style={{backgroundColor: '#daa520', height: '50px'}}>
                    <div className={'d-flex w-100 justify-content-between align-items-center'}>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span className={'text-white font-weight-bold'}>Login</span>
                      <span className={'p-2 d-flex'} style={{backgroundColor : 'white', transform: 'translate(-100%,0)'}}>
                         <i className={'font-weight-light fa  fa-arrow-right'}></i>
                      </span>
                    </div>
                  </div>
              </form>
              <div className={'d-flex align-items-center'}>
                <hr width={'45%'} className={Style.garis}/>
                <span className={'mx-3'}>Or</span>
                <hr width={'45%'} className={Style.garis}/>
              </div>
              <div className={'d-flex justify-content-around my-4'}>
                <div>
                  ini button gogole
                </div>
                <div>
                  ini button facebook
                </div>
              </div>
              <div className={'text-center'}>
                Don't have an account? <Link to={'/register'}>sign up</Link>
              </div>
            </div>
          </div>
          </div>
      </div>
    )
  }


}

export default LoginPage