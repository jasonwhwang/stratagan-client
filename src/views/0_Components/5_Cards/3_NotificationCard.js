import React from 'react'
import Image from '../../../img/placeholder.svg'
import Icon from '../../../img/stratagan-icon.png'
import { Link } from 'react-router-dom'
import './Card.css'
import { notificationPD } from './_placeholderData'

class NotificationCard extends React.Component {
  render() {
    let notificationPlaceholder = notificationPD
    let notification = this.props.notification ? this.props.notification : notificationPlaceholder
    let dateConverted = notification.date

    return (
      <Link to={notification.url}
        className={`box-color-black box-list box-border-bottom card-padding box-flex-row box-flex-acenter ${notification.seen && "box-background"}`}>
        <NotificationCenter notification={notification} />

        <h6 className="box-spacer box-text-7 box-text-bold box-margin-right-20">{notification.typeDescription}</h6>
        <h6 className="box-text-8 box-text-bold box-color-mediumgray">{dateConverted}</h6>
      </Link>
    )
  }
}

let NotificationCenter = (props) => {
  let notification = props.notification
  if (notification.type === "challenge") {
    return (
      <div className="box-spacer box-flex-row box-margin-right-20">
        <div className="box-expand-height">
          <div className="box-img-rectangleWrapper box-profileImage-m card-br-5 box-margin-right-10">
            <img src={Image} alt="Challenge" className="box-img-circle" draggable="false" />
          </div>
        </div>

        <div className="box-spacer box-expand-height">
          <h5>{notification.title}</h5>
        </div>
      </div>
    )
  } else if (notification.type === "member") {
    return (
      <div className="box-spacer box-flex-row box-flex-acenter box-margin-right-20">
        <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
          <img src={notification.image ? notification.image : Icon} className="box-img-circle" alt="Member" draggable="false"/>
        </div>
        <div>
          <h6 className="box-text-bold">{notification.name}</h6>
          <h6 className="box-text-nobold box-text-7">{notification.description}</h6>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default NotificationCard