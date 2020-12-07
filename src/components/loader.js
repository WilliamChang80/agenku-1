import React from "react"

const Loader = ({ message, bootstrapColor="dark" }) => {
  return(
    <div className={`spinner-grow text-${bootstrapColor}`} role="status">
      <span className="sr-only">Loading...</span>
      {message}
    </div>
  )
}

export default Loader