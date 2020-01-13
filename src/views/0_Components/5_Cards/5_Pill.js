import React from 'react'

const Pill = (props) => {
  switch (props.status) {
    case "Open":
      return <h6 className="box-pill box-background-blue box-flex-row-center">Open</h6>
    case "Closed":
      return <h6 className="box-pill box-background-red box-flex-row-center">Closed</h6>
    case "Completed":
      return <h6 className="box-pill box-background-goldGradient box-flex-row-center">Completed</h6>
    default:
      return <h6 className="box-pill box-pill-line box-flex-row-center">Draft</h6>
  }
}

export default Pill