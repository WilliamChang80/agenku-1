import React, { useEffect, useState } from "react"
import Layout from "../../layout"
import { handleGet, handlePost } from "../../../services/request"
import { getUser } from "../../../services/auth"
import Loader from "../../loader"
import AgencyHomeCard from "./agencyHomeCard"



const AgencyHomePage = () => {
  const [state,setState] = useState({
    thisAgencyData : {id : ""},
    transactions : [],
  })
  const [success,setSuccess] = useState("")

  const handleConfirmSuccess = () => {
    setSuccess("Order Has Been Confirmed")
  }

  const getAgencyData  = async () => {
    const thisUser = getUser()
    const promise = await handleGet(`/user/${thisUser.data.user.id}/agency`,true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      thisAgencyData: {...data}
    }))
     getAllRelatedTransaction(data.id)
  }

  const getAllRelatedTransaction = async (id) => {
    const promise = await handleGet(`/transaction/agency/${id}`,true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      transactions: [...data]
    }))
  }

  useEffect(() => {
    getAgencyData()
  },[])

  const CONFIRM_CHECK = "Waiting confirmation";
  return (
    <Layout>
      <h1>This page will show all transactions</h1>
      {success &&
      <div className="alert alert-success" role="alert">
        {success}
      </div>
      }
      <div className={'d-flex flex-wrap justify-content-around'}>
        {state.transactions.map((item)=>
          <AgencyHomeCard item={item} handleConfirmSuccess={handleConfirmSuccess} />
        )}
      </div>
    </Layout>
  )
}

export default AgencyHomePage