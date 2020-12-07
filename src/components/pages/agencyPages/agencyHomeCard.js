import React, { useEffect, useState } from "react"
import { handleGet, handlePost } from "../../../services/request"
import Loader from "../../loader"



const AgencyHomeCard = ({item, handleConfirmSuccess}) => {
  const [loading,setLoading] = useState(null)
  const [term,setTerm] = useState("")

  const handleTransactionConfirm = async (id) => {
    setLoading(id);
    const promise = await handlePost(`/transaction/${id}/confirm`,{},true);
    const {code, message} = promise;
    if (code === 200){
      setLoading(null);
      handleConfirmSuccess()
    }
  }

  const handleChange = (e) => {
    const {value,id} = e.target
    setTerm(prevState => ({
      ...prevState,
      term: e.target.value
    }))
  }

  const CONFIRM_CHECK = "Waiting confirmation";
  return (
    <div className="p-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{item.details[0].serviceName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{item.status}</h6>
          <h6>Cancel Time : <span className="badge badge-pill badge-danger">{item.details[0].deadline}</span></h6>
          <h6 className="card-subtitle">IDR{item.details[0].price}</h6>
          {item.status===CONFIRM_CHECK&&(
            loading!==item.id?
              <div>
                <hr/>
                <div className="form-group mt-3">
                  <label htmlFor="exampleInputEmail1">Terms and Condition</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">You must enter your terms on doing this job for your client.</small>
                </div>
                <button className={'btn btn-primary'} onChange={handleChange} onClick={() => handleTransactionConfirm(item.id)}>Confirm</button>
              </div>:
              <Loader bootstrapColor={"primary"}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default AgencyHomeCard