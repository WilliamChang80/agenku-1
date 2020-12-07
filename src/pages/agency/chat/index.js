import React from "react"
import AgencyChatPage from "../../../components/pages/agencyPages/agencyChatPage"

const ChatPage = ({location}) => {
  return <AgencyChatPage choosenAgencyId={location.state.thisAgencyId} />
}

export default ChatPage
