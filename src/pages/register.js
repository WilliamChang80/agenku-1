import React, { useState } from "react"
import { register } from "../services/auth"
import { navigate } from "../../.cache/gatsby-browser-entry"

const RegisterPage = () => {
  const [state,setState] = useState({
    email : '',
    name : '',
    password : '',
    confirmPassword: '',
    errorMessage: '',
  })

  const handleChange = (e) => {
    const {id, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    if (confirmPasswordCheck()){
      const cred = {email : state.email, password : state.password}
      const promise = await register(cred);
      const {message,status} = promise;
      if(status === 200){
        navigate('/login');
      }else{
        setState(prevState => ({ ...prevState,errorMessage : message}))
      }
    }
    else{
      setState(prevState => ({...prevState,errorMessage: "Password Not Match"}))
    }
  }

  const confirmPasswordCheck = () => {
    if (state.confirmPassword==state.password) return true;
    else return false;
  }

  return(
    <div className={'container'}>
      {(state.errorMessage!='')&&<div className='alert alert-danger'>{state.errorMessage}</div>}
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
               placeholder="Enter email" onChange={handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
            else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Password"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} placeholder="Confirm Password"/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default RegisterPage
