import React, { useEffect, useState } from "react"
import Layout from "../../layout"
import {  setUser,getUser } from "../../../services/auth"
import { handleGet, handlePost } from "../../../services/request"
import { API } from '../../../config/api.config'
import { navigate } from "../../../../.cache/gatsby-browser-entry"

const ClientRegistrationPage = () => {

  const [state,setState] = useState({
    name : '',
    location : '',
    phoneNumber : '',
    type : {},
    allTypes : [],
    message : "",
    userId : getUser().data.user.id
  })

  const getClientTypes =  async () => {
    const promise = await handleGet(`/client-types`,true)
    const {message,code,data} = promise
    setState(prevState => ({
      ...prevState,
      allTypes: data.types,
      type : {
        id : data.types[0].id
      }
    }))
  }

  useEffect(()=>{
    getClientTypes()
  },[])


  const handleChange = (e) => {
    const {id,value} = e.target
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleTypeChange = (e) => {
    const {value} = e.target
    setState(prevState => ({
      ...prevState,
      type : {
        id : value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(state)
    const {name,location,type,userId,phoneNumber} = state
    const data = {name,location,type,userId,phoneNumber}
    console.log(data)
    const promise = await handlePost('/user/client/profile',data,true)
    console.log(promise)
    const {message,code = 400} = promise
    if (code === 200){
      const authUser = getUser()
      authUser.data.user.roles.push("CLIENT")
      setUser(authUser)
        navigate('/home')
    }else{
      setState(prevState => ({
        ...prevState,
        message
      }))
    }

  }

  return (
    <Layout>
      <div className={'my-3'}>
        <h1 className={'text-capitalize'}>To become a client please fill the following information</h1>
        <div className={state.message === "" ? 'd-none' : 'alert alert-danger'}>
          {state.message}
        </div>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="name">Customer name</label>
          <input type="email" className="form-control" id="name" value={state.name} onChange={handleChange} aria-describedby="emailHelp"
                 placeholder="John doe"/>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <input type={"tel"} className="form-control" id="phoneNumber" value={state.phoneNumber} onChange={handleChange} placeholder="08123456789"/>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" placeholder={'Medan, Sumatera utara'} value={state.location} onChange={handleChange} id="location"/>
        </div>
        <div className={'d-flex align-items-center form-group'}>
          <label htmlFor={'type'}>Service type needed : </label>
          <div className={'d-flex ml-3'}>
            <select className={'form-control'} name={'type'} id={'type'} onChange={handleTypeChange}>
              {state.allTypes.map((type) => {
                return (<option key={type.id} value={type.id}>{type.name}</option>)
              })}
            </select>
          </div>

        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  )
}

export default ClientRegistrationPage