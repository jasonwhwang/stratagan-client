import React from 'react'
import Image from '../../../img/placeholder.svg'
import Icon from '../../../img/stratagan-icon.png'
import { Link } from 'react-router-dom'
import './Card.css'
import { requestPD } from './_placeholderData'

class RequestCard extends React.Component {
  render() {
    let requestPlaceholder = requestPD
    let request = this.props.request ? this.props.request : requestPlaceholder
    let dateConverted = request.date

    return (
      <Link to={request.url}
        className={`box-color-black box-list box-border-bottom card-padding box-flex-row box-flex-acenter ${request.seen && "box-background"}`}>
        <div className="box-spacer box-flex-row box-flex-acenter box-margin-right-20">
          <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
            <img src={request.image ? request.image : Icon} className="box-img-circle" alt="Member" />
          </div>
          <div>
            <h6 className="box-text-bold">{request.author.name}</h6>
            <h6 className="box-text-nobold box-text-7">{request.author.description}</h6>
          </div>
        </div>

        <RequestCenter request={request} />
        <h6 className="box-text-8 box-text-bold box-color-mediumgray">{dateConverted}</h6>
      </Link>
    )
  }
}

let RequestCenter = (props) => {
  let request = props.request
  if (request.type === "challenge") {
    return (
      <div className="box-spacer box-flex-row box-margin-right-20">
        <div className="box-expand-height">
          <div className="box-img-rectangleWrapper box-profileImage-s card-br-5 box-margin-right-10">
            <img src={Image} alt="Challenge" className="box-img-circle" />
          </div>
        </div>

        <div className="box-spacer box-expand-height">
          <h6 className="box-text-bold">{request.title}</h6>
        </div>
      </div>
    )
  } else if (request.type === "payment") {
    return (
      <div className="box-spacer box-margin-right-20">
        <h6 className="box-text-bold">{props.request.title}</h6>
        <h6 className="box-text-nobold">{props.request.description}</h6>
      </div>
    )
  } else {
    return null
  }
}

export default RequestCard