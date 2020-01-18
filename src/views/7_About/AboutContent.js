import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../img/business-team.svg'
import { IoIosArrowRoundForward } from "react-icons/io"

const AboutContent = () => {
  return (
    <div className="landing-superWrapper">
      <div className="landing-mainWrapper box-flex-col box-flex-jcenter">
        <h1 className="landing-title box-margin-bottom-30">Solve business challenges.</h1>

        <h3 className="box-text-nobold landing-heading landing-headingText box-lineheight1 box-margin-bottom-60">
          We believe that by bringing the best people together, we can solve the greatest of challenges.
                </h3>

        <div className="landing-buttonsMargin box-flex-row box-flex-wrap">
          <Link className="box-margin-bottom-20 box-button box-flex-row-center landing-button box-text-6"
            to="/signup">Join</Link>
          <Link className="box-margin-bottom-20 box-button-line box-flex-row-center landing-button box-text-6"
            to="/s/all">Explore</Link>
          <Link className="box-margin-bottom-20 landing-button box-flex-row-center box-text-6 landing-learn"
            to="/about">
            <span>Learn More</span>
            <span className="box-flex-row-center box-margin-left-10 landing-arrow">
              <IoIosArrowRoundForward />
            </span>
          </Link>
        </div>
      </div>

      <div className="landing-imageWrapper">
        <div className="box-img-rectangleWrapper landing-image box-margin-bottom-40">
          <img src={Image} className="box-img-circle" alt="Stratagan" draggable="false" />
        </div>
      </div>
    </div>
  )
}

export default AboutContent