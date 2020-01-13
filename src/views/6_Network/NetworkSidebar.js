import React from 'react'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import Icon from '../../img/stratagan-icon.png'
import { FiLinkedin, FiLink2 } from "react-icons/fi"

class NetworkSidebar extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="page-main-wide-sidebar box-flex-col box-margin-right-40" id="d-left">
          <div className="box-img-rectangleWrapper n-imageDim box-container box-shadow-lite">
            <img src={this.props.user.image ? this.props.user.image : Icon}
              className="box-img-circle"
              alt="Account"
              draggable="false" />
          </div>

          <h3 className="box-margin-top-40 box-margin-bottom-5">{this.props.user.name}</h3>
          <div className="box-flex-row box-margin-bottom-30">
            {
              this.props.user.role &&
              <h6 className="box-text-nobold margin4">{this.props.user.role + " @"}</h6>
            }
            {
              this.props.user.company &&
              <h6 className="box-text-nobold box-color-black box-text-6">{this.props.user.company}</h6>
            }
          </div>

          <div className="box-flex-row box-flex-acenter">
            {this.props.user.linkedIn &&
              <a href={this.props.user.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="box-text-5 box-margin-right-20">
                <FiLinkedin />
              </a>
            }
            {this.props.user.website &&
              <a href={this.props.user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="box-text-4">
                <FiLink2 />
              </a>
            }
          </div>

        </div>
      </ErrorBoundary>
    )
  }
}

export default NetworkSidebar