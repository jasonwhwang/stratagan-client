import React from 'react'
import Image from '../../../img/stratagan.png'
import { Link } from 'react-router-dom'
import './Card.css'
import PlaceImage from '../../../img/placeholder.svg'
import { FiBookmark } from "react-icons/fi"
import Pill from "./5_Pill"
import { challengePD } from './_placeholderData' 

class ChallengeCard extends React.Component {
  render() {
    let placeholderData = challengePD
    let data = this.props.data ? this.props.data : placeholderData
    return (
      <div className='box-flex-row card-padding box-list box-border-bottom'>
        <Link to={`/c/${data.sub}`}><div className='card-imgWrapper box-flex-row-center box-margin-right-10'>
          <img
            src={data.image ? data.image : PlaceImage}
            alt='Challenge'
            className='card-img'
            draggable="false" />
        </div></Link>

        <div className="box-spacer box-flex-col box-margin-left-5">
          <Link to={`/c/${data.sub}`}>
            <div className="box-flex-between">
              <h5 className='box-margin-bottom-5 box-color-black'>{data.title}</h5>
              <Pill status={data.status} />
            </div>
            <h6 className='box-lineheight1 box-margin-bottom-5 box-text-nobold box-color-gray'>{data.heading}</h6>
          </Link>

          <div className="box-spacer"></div>

          <div className='box-flex-between'>
            <Link to={`/m/${data.author.username}`} className="box-flex-row box-flex-acenter">
              <div className='box-img-rectangleWrapper box-companyImage-s box-margin-right-10'>
                <img className='box-img-rectangle'
                  src={data.author.companyImage ? data.author.companyImage : Image}
                  alt='Company'
                  draggable="false" />
              </div>
              <h6 className='box-text-nobold box-text-7 box-color-black'>{data.author.company}</h6>
            </Link>


            <button className={`box-text-6 card-bookmarkButton ${data.userBookmarked && "card-bookmarkButtonSelected"}`}>
              <FiBookmark className="box-margin-top-5" />
            </button>
            
          </div>
        </div>
      </div>
    )
  }
}

export default ChallengeCard