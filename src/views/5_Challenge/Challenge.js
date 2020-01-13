import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Challenge.css'
import ChallengePage from './pages/0_ChallengePage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import { FiSend, FiBarChart2, FiInfo } from "react-icons/fi"

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
                  className={`${this.props.location.pathname === linkPath + "/requests" && "box-tab-selected"} box-tab`}>
                  <FiSend className="box-text-6" />
                </Link>
                <Link to={linkPath + "/objectives"}
                  className={`${this.props.location.pathname === linkPath + "/objectives" && "box-tab-selected"} box-tab box-margin-left-5`}>
                  <FiBarChart2 className="box-text-5 c-iconRotate90" />
                </Link>
                <Link to={linkPath + "/info"}
                  className={`${this.props.location.pathname === linkPath + "/info" && "box-tab-selected"} box-tab box-margin-left-5`}>
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
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Challenge)