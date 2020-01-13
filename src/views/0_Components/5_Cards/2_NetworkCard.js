import React from 'react'
import Icon from '../../../img/stratagan-icon.png'
import { Link } from 'react-router-dom'
import './Card.css'

import { IoIosCheckmark } from "react-icons/io"
import { networkPD } from './_placeholderData'

class NetworkCard extends React.Component {
  render() {
    let placeholderData = networkPD
    let data = this.props.data ? this.props.data : placeholderData

    return (
      <div className='box-flex-row card-padding box-list box-border-bottom'>
        <Link to={`/m/${data.username}`}>
          <div className="box-img-circleWrapper box-profileImage-sl box-shadow-lite box-margin-right-20">
            <img alt="Member"
              src={data.image ? data.image : Icon}
              className="box-img-circle"
              draggable="false" />
          </div>
        </Link>

        <div className="box-spacer">
          <div className="box-flex-between box-margin-bottom-20 box-margin-top-5">
            <Link to={`/m/${data.username}`}>
              <h4 className="box-text-bold box-color-black">{data.name}</h4>
              <h6 className="box-text-nobold box-color-gray">{data.role + " @ " + data.company}</h6>
            </Link>
            <div className="box-flex-col">
              {
                data.isFollowing ?
                  <button className="box-button-line-gray box-button-line-graySelected box-text-bold box-flex-row box-flex-acenter">
                    Following <IoIosCheckmark className="box-text-5 box-margin-left-3" />
                  </button>
                  :
                  <button className="box-button-line-gray box-text-bold box-flex-row box-flex-acenter">
                    Follow
                  </button>
              }
            </div>
          </div>

          <Link to={`/m/${data.username}`}><p className="box-color-gray box-text-6 box-margin-bottom-20 box-lineheight0">
            {data.headline}
          </p></Link>

          <div className="box-flex-row">
            <h6 className="box-text-8 box-color-gray box-text-bold">
              <span className="box-margin-right-5">{data.upvotesCount}</span>
              {
                data.upvotesCount === 1 ? "Upvote" : "Upvotes"
              }
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

export default NetworkCard