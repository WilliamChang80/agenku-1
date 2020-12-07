import React, { useEffect, useState } from "react"
import Chat from "react-chatbox-component/dist/components/Chat"
import { handleGet, handlePost } from "../../../services/request"
import Layout from "../../layout"
import "react-chatbox-component/dist/style.css"
import Image1 from "../../../images/profile1.jpg"
import Image3 from "../../../images/profile3.jpg"

const AgencyChatPage = () => {
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [title, setTitle] = useState()
  const [type, setType] = useState("")
  const [id, setId] = useState()

  const getChatData = async () => {
    const promise = await handleGet(`/chat/agency/4`, true)
    const { data } = promise
    await setChats(data)
    data.map(c => getMessageData(c.id))
  }

  const handleChange = e => {
    const { value } = e.target
    setType(value)
  }

  useEffect(() => {
    getChatData()
  }, [])
  const getMessageData = async id => {
    const promise = await handleGet(`/chat/${id}`, true)
    setId(id)
    const { data } = promise
    setTitle(data.client.name)
    const messages = data.messages.map((d, idx) => ({
      text: d.message,
      id: idx,
      sender: {
        name: d.name,
        uid: data.agency.name === d.name ? "user2" : "user1",
        avatar: data.agency.name === d.name ? Image1 : Image3,
      },
    }))
    setMessages(messages)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const data = {
      message: type,
      sender: {
        id: parseInt(user.data.user.id),
      },
    }
    await handlePost(`/chat/${id}/message`, data, true)
    setType("")
  }
  return (
    <Layout>
      <div className="container">
        <div className="chat-header">
          <h5>
            <b>{title}</b>
          </h5>
        </div>
        <form>
          <input
            type={"text"}
            placeholder={"Enter your message"}
            onChange={handleChange}
          />
          <button
            type={"submit"}
            id={"submit"}
            onClick={handleSubmit}
            className={
              " my-3 d-flex align-items-center justify-content-center w-100"
            }
          >
            Send
          </button>
        </form>
        <Chat messages={messages} />
      </div>
    </Layout>
  )
}

export default AgencyChatPage
