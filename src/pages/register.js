import React, { useState } from "react"

const RegisterPage = () => {
  const [state,setState] = useState({
    email : '',
    name : '',
    phoneNumber : '',
    password : '',
    location : '',
    type : '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const {id, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  }

  return(
    <div className={'container'}>
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
      <div className="form-check my-3">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default RegisterPage
