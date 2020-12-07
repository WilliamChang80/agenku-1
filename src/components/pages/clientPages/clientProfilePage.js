import React, { useEffect, useState } from "react"
import { handleGet } from "../../../services/request"
import { getUser } from "../../../services/auth"
import Image from "../../../images/profile1.jpg"

const ClientProfilePage = ({ id, author }) => {
  const [state, setState] = useState({
    name: "",
    location: "",
    phoneNumber: "",
    clientType: [],
  })

  const getClientData = async () => {
    const promise = await handleGet(`/user/${id}/client`, true)
    const { data } = promise
    setState(prevState => ({
      ...data,
    }))
    return
  }

  useEffect(() => {
    getClientData()
  }, [])

  console.log(state)
  return (
    <div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        My profile
      </h1>
      <div
        class="card d-flex flex-row"
        style={{
          padding: "2rem",
          borderRadius: "1rem",
          border: "3px solid #5a10c9",
        }}
      >
        <div className="d-flex flex-column">
          <div
            style={{ fontWeight: "bold", fontSize: "4rem", color: "#5a10c9" }}
          >
            {state["name"]}
          </div>

          <img
            class="card-img-top"
            style={{
              width: "20vw",
              height: "40vh",
              borderRadius: "100%",
              border: "4px solid black",
            }}
            src={Image}
            alt="Card image cap"
          ></img>
        </div>

        <div class="card-body">
          <div style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            Location at {state["location"]}
          </div>

          <div style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            <div className="fa fa-phone"></div> {state["phoneNumber"]}
          </div>

          <div style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            Speciality in {state.clientType.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfilePage
