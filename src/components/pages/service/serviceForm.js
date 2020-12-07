import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout"
import { handleGet, handlePost } from "../../../services/request"
import { getUser } from "../../../services/auth"
import { navigate } from "gatsby"


const ServiceForm = ({serviceData = {}, type,title}) => {
  const [state,setState] = useState({
    dataToSend : {
      agencyId : '',
      description :  '',
      name : '',
      priceEnd :  '',
      priceStart : '',
      type :  {
      },
    },
    message: "",
    servicesTypes : [],
  })

  const getServiceTypes = async () => {
    const promise = await handleGet('/service-types',true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      servicesTypes : data.types,
      dataToSend: {
        ...prevState.dataToSend,
        type: data.types[0]
      }
    }))
  }

  const getThisAgencyData = async () => {
    const thisUser = getUser()
    const promise = await handleGet(`/user/${thisUser.data.user.id}/agency`,true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      dataToSend: {
        ...prevState.dataToSend,
        agencyId: data.id
      }
    }))
  }

  const setOldData = () => {
   serviceData && setState(prevState => {
      return ({
      ...prevState,
      dataToSend: {
        ...prevState.dataToSend,
        ...serviceData
      }
    })})
  }

  useEffect(() => {
    getServiceTypes()
    getThisAgencyData()
    setOldData();
  },[])



  const handleChange = (e) => {
    const {value,id} = e.target
    setState(prevState => ({
      ...prevState,
      dataToSend : { ...prevState.dataToSend,[id] : value }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(state)
    console.log(serviceData)
    let promise;
    if(type === 'add'){
      promise = await handlePost('/service',state.dataToSend,true)
    }else{
      promise = await handlePost(`/service/${serviceData.id}`,state.dataToSend,true)
    }
    const {code, message, data} = promise
    if (code === 200){
      await navigate('/home/my-profile')
    }else{
      data.message = message
    }
  }

  const handleChangeSelect = (e) => {
    const {value} = e.target
    setState(prevState => ({
      ...prevState,
      dataToSend: {
        ...prevState.dataToSend,
        type : {
          id : value
        }
      }
    }))
  }



  return (
    <Layout>
      <h1 className={'mb-3'}>{title}</h1>
      <div className={state.message === '' ? 'd-none' : 'alert alert-danger'}>
        {state.message}
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Service name : </label>
          <input type="email" value={state.dataToSend.name} onChange={handleChange} className="form-control" id="name"
                 placeholder="Advertising service"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id={'description'} value={state.dataToSend.description} placeholder={'By using our service your sale will improve up to 10% if your total sale is about 1000'} className={'form-control'} onChange={handleChange}></textarea>
        </div>

        <div className={'d-flex align-items-center'}>
          <label htmlFor={'type'}>Choose service type : </label>
          <div>
            <select id={'type'} className={'form-control mx-3'} value={state.dataToSend.type} onChange={handleChangeSelect}>
              {state.servicesTypes.map((type) => {
                return <option key={type.id} value={type.id} >{type.name}</option>
              })}
            </select>
          </div>
        </div>

        <div className={'d-flex flex-column'}>
          <div className={'my-3'}>
            Please input your service price range :
          </div>
          <div className={'d-flex align-items-center'}>
            <div className={'form-group'}>
              <label htmlFor={'priceStart'}>Price start</label>
              <input className={'form-control'} type={'number'} placeholder={'1000000'} value={state.dataToSend.priceStart} onChange={handleChange} id={'priceStart'}/>
            </div>
            <div className={'mx-4'}>
              -
            </div>
            <div className={'form-group'}>
              <label htmlFor={'priceEnd'}>Price end</label>
              <input className={'form-control'} type={'number'} placeholder={'5000000'} id={'priceEnd'} value={state.dataToSend.priceEnd} onChange={handleChange}/>
            </div>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  )
}

export default ServiceForm