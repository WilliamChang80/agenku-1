import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout"
import { handleGet } from "../../../services/request"
import { getUser } from "../../../services/auth"


const RegisServicePage = () => {

  const [state,setState] = useState({
    dataToSend : {
      agencyId : '',
      description : '',
      name : '',
      priceEnd : '',
      priceStart : '',
      type : {

      },
    },
    message: "",
    servicesTypes : ""


  })

  const getServiceTypes = async () => {
    const promise = await handleGet('/service-types',true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      servicesTypes : data.types
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

  useEffect(() => {
    getServiceTypes()
    getThisAgencyData()
  },[])

  const handleChange = (e) => {
    const {value,id} = e.target
    setState(prevState => ({
      ...prevState,
      dataToSend : { ...prevState.dataToSend,[id] : value }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }

  return (
    <Layout>
      <h1 className={'mb-3'}>Register your service here</h1>
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

export default RegisServicePage