import React from 'react'
import { Link } from 'react-router-dom'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import NetworkAbout from './components/1_NetworkAbout'
import NetworkChallenges from './components/2_NetworkChallenges'
import { FiSettings } from "react-icons/fi"
import NetworkNetwork from './components/3_NetworkNetwork'

class NetworkMain extends React.Component {
  render() {
    let linkPath = "/m/" + this.props.match.params.username

    return (
      <div className="box-flex-col box-spacer" id="d-right">
        <div className="box-spacer box-flex-col">
          <ErrorBoundary>
            <div className="box-spacer box-flex-col box-container box-shadow-lite">
              <div className="box-flex-row box-flex-acenter box-tabs">
                <Link to={linkPath}
                  className={`${this.props.location.pathname === linkPath && "box-tab-selected"} box-tab box-margin-left-10`}>
                  About
                </Link>
                <Link to={linkPath + "/challenges"}
                  className={`${this.props.location.pathname === linkPath + "/challenges" && "box-tab-selected"} box-tab box-margin-left-10`}>
                  Challenges
                </Link>
                <Link to={linkPath + "/network"}
                  className={`${this.props.location.pathname === linkPath + "/network" && "box-tab-selected"} box-tab box-margin-left-10`}>
                  Network
                </Link>
                <div className="box-spacer"></div>
                {this.props.authUser && this.props.authUser.username !== this.props.user.username ?
                  <button className="box-button-line-gray box-background box-text-bold box-margin-right-10">
                    Follow
                    </button>
                  :
                  <Link to={"/settings"}
                    className={`box-button-heading box-text-bold box-flex-row-center box-dropdown-heading-br`}>
                    <FiSettings className="box-text-6" />
                  </Link>
                }
              </div>

              {this.props.location.pathname === linkPath &&
                <NetworkAbout
                  user={this.props.user}
                  authUser={this.props.authUser} />
              }
              {this.props.location.pathname === linkPath + "/challenges" &&
                <NetworkChallenges />
              }
              {this.props.location.pathname === linkPath + "/network" &&
                <NetworkNetwork />
              }
            </div>
          </ErrorBoundary>
        </div>
      </div>
    )
  }
}

export default NetworkMain