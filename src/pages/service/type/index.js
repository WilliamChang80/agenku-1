import React, { useEffect, useState } from "react"
import { handleGet, handlePost } from "../../../services/request"

const ServiceType = () => {

  const handleCreate = async () => {
    const type = {
      name: "Hello"+Math.random()*100,
    }
    const promise = await handlePost(`/client-type`, type, true)
    const { data, status } = promise
    if (status == 200) {
      alert("Success Make")
    }
  }
  useEffect(() => {
    handleCreate()
  }, [])

  return<div></div>
}
export default ServiceType