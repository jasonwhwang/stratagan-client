import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Challenge.css'
import ChallengePage from './pages/0_ChallengePage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import { FiSend, FiBarChart2, FiInfo } from "react-icons/fi"
import Proposals from './pages/1_Proposals'
import Requests from './pages/2_Requests'
import Objectives from './pages/3_Objectives'
import Updates from './pages/4_Updates'

const mapStateToProps = state => ({
  authUser: state.common.user
})

class Challenge extends React.Component {
  componentDidMount() {
    document.getElementById("app").style.backgroundColor = "white"
  }
  componentWillUnmount() {
    document.getElementById("app").style.backgroundColor = "var(--background)"
  }

  render() {
    let linkPath = "/c/" + this.props.match.params.challenge

    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper box-position-relative">
            <div className="page-main box-flex-col box-position-relative">
              <div className="box-flex-row box-flex-acenter box-tabs">
                <Link to={linkPath}
                  className={`${this.props.location.pathname === linkPath && "box-tab-selected"} box-tab`}>
                  The Challenge
                </Link>
                <Link to={linkPath + "/proposals"}
                  className={`${this.props.location.pathname === linkPath + "/proposals" && "box-tab-selected"} box-tab box-margin-left-10`}>
                  Proposals
                </Link>
                <div className="box-spacer"></div>
                <Link to={linkPath + "/requests"}
                  className={`${this.props.location.pathname.indexOf(linkPath+'/requests') !== -1 && "box-tab-selected"} box-tab`}>
                  <FiSend className="box-text-6" />
                </Link>
                <Link to={linkPath + "/objectives"}
                  className={`${this.props.location.pathname.indexOf(linkPath+'/objectives') !== -1 && "box-tab-selected"} box-tab box-margin-left-5`}>
                  <FiBarChart2 className="box-text-5 c-iconRotate90" />
                </Link>
                <Link to={linkPath + "/updates"}
                  className={`${this.props.location.pathname === linkPath + "/updates" && "box-tab-selected"} box-tab box-margin-left-5`}>
                  <FiInfo className="box-text-6" />
                </Link>
              </div>
              
              {!this.props.match.params.route &&
                <ChallengePage
                  type={"challenge"}
                  history={this.props.history}
                  authUser={this.props.authUser}
                  challenge={this.props.match.params.challenge} />
              }

              {this.props.location.pathname.indexOf('/proposals') !== -1 &&
                <Proposals location={this.props.location} linkPath={linkPath} authUser={this.props.authUser}/>
              }
              {this.props.location.pathname.indexOf('/requests') !== -1 &&
                <Requests location={this.props.location} linkPath={linkPath} authUser={this.props.authUser}/>
              }
              {this.props.location.pathname.indexOf('/objectives') !== -1 &&
                <Objectives location={this.props.location} linkPath={linkPath} authUser={this.props.authUser}/>
              }
              {this.props.location.pathname.indexOf('/updates') !== -1 &&
                <Updates location={this.props.location} linkPath={linkPath} authUser={this.props.authUser}/>
              }
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Challenge)