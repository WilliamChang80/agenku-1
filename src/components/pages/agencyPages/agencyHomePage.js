import React, { useEffect, useState } from "react"
import Layout from "../../layout"
import { handleGet } from "../../../services/request"
import { getUser } from "../../../services/auth"

const AgencyHomePage = () => {
  const [state, setState] = useState({
    thisAgencyData: { id: "" },
    transactions: [],
  })

  const getAgencyData = async () => {
    const thisUser = getUser()
    const promise = await handleGet(
      `/user/${thisUser.data.user.id}/agency`,
      true
    )
    const { data } = promise
    setState(prevState => ({
      ...prevState,
      thisAgencyData: { ...prevState.thisAgencyData, ...data },
    }))
  }

  const getAllRelatedTransaction = async () => {
    const promise = await handleGet(
      `/transaction/agency/${state.thisAgencyData.id}`,
      true
    )
    const { data } = promise
    setState(prevState => ({
      ...prevState,
      transactions: [...prevState.transactions, ...data],
    }))
  }

  useEffect(() => {
    getAgencyData()
  }, [])

  useEffect(() => {
    getAllRelatedTransaction()
  }, [state.thisAgencyData.id])

  return (
    <Layout>
      <h1>This page will show all transactions</h1>
      <div>blm dibuat sih ado</div>
    </Layout>
  )
}

export default AgencyHomePage
