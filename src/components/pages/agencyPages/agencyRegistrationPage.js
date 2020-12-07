import React, { useEffect, useState } from "react"
import Layout from "../../layout"
import { handleGet, handlePost } from "../../../services/request"
import { getUser, setUser } from "../../../services/auth"
import { navigate } from "../../../../.cache/gatsby-browser-entry"

const AgencyRegistrationPage = () => {

  const [state,setState] = useState({
    allTypes : [],
    description : '',
    name : '',
    'phoneNumber' : '',
    'rating' : 0,
    'userId' : getUser().data.user.id,
    'message' : "",
    clientTypes : []
  })

  const getType = async () => {
    const promise = await handleGet('/client-types',true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      allTypes: data.types
    }))
  }

  useEffect(() => {
    getType()
  }, [])

  const handleChange = (e) => {
    const {id,value} = e.target
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const handleChangeClientTypes = (e) => {
    const {value,checked} = e.target
    if(!checked){
      setState(prevState => {
        let newClientTypes = prevState.clientTypes.filter(type => {
          return type.id !== value
        })
        return({
          ...prevState,
          clientTypes: newClientTypes
        })
      })
    }else{
      setState(prevState => ({
        ...prevState,
        clientTypes: [...prevState.clientTypes,{id : value}]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {clientTypes,description,phoneNumber,name,rating,userId} = state
    const data = {clientTypes,description,phoneNumber,name,rating,userId}
    const promise = await handlePost('/user/agency/my-profile',data,true)
    const {message,code} = promise
    if (code === 200){
      const authUser = getUser()
      authUser.data.user.roles.push("AGENCIES")
      setUser(authUser)
      navigate('/home')
    }else {
      setState(prevState => ({ message }))
    }
  }

  return(
    <Layout>
      <div className={'my-3'}>
        <h1 className={'text-capitalize'}>To become an Agency please fill the following information</h1>
        <div className={state.message === "" ? 'd-none' : 'alert alert-danger'}>
          {state.message}
        </div>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Agency Name</label>
          <input type="text" className="form-control" onChange={handleChange} id="name" value={state.name}
                 placeholder="P.T. Agenku Indonesia"/>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" className="form-control" onChange={handleChange} id="phoneNumber" value={state.phoneNumber}
                 placeholder="08123456789"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className={'form-control'} value={state.description} placeholder={'perusahaan yang bertujuan untuk membantu masyarakat'} onChange={handleChange} id={'description'}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="types" className={'form-input-check'}>What are your Services types?</label>
          <div>
            {state.allTypes.map((type,index) => {
              return (<div key={type.id} className={'custom-control custom-checkbox'}>
                <input type={'checkbox'} name={'type'} onChange={handleChangeClientTypes} className={'custom-control-input'} id={`type-${index}`} value={type.id} />
                <label htmlFor={`type-${index}`} className={'custom-control-label'}>{type.name}</label>
              </div>)
            })}
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  )
}

export default AgencyRegistrationPage