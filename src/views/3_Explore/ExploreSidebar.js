import React from 'react'
import { Link } from 'react-router-dom'
import './Explore.css'
import { FiChevronDown } from "react-icons/fi"
import { getMembersCount } from '../../services/api'
import Icon from '../../img/stratagan-icon.png'

class ExploreSidebar extends React.Component {
  state = {
    count: 0,
    members: []
  }
  initializeState = async () => {
    let countRes = await getMembersCount({community: this.props.community})
    this.setState({ ...this.state, count: countRes.count, members: countRes.members })
  }
  async componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if(prevProps.community !== this.props.community) this.initializeState()
  }

  render() {
    let memberString = this.state.count !== 1 ? "Members" : "Member"
    return (
      <div className="page-main-wide-sidebar box-flex-col box-margin-right-40" id="d-left">
        <Link to="/search"
          className="box-expand-width explore-sidebarMargin box-text-2 box-text-extraBold box-color-black e-alignText box-flex-between">
          {this.props.community ? this.props.community : "All Challenges"}
          <FiChevronDown className="box-margin-left-10 box-margin-top-3" />
        </Link>

        <div className="box-flex-row box-flex-acenter box-margin-bottom-5">
          <h6 className="box-text-bold box-margin-right-5">{this.state.count}</h6>
          <h6 className="box-text-7 box-text-nobold">{memberString}</h6>
        </div>

        <div className="box-flex-row box-flex-wrap">
          {this.state.members.map(member => {
            return (
              <Link to={`/m/${member.username}`}
                key={member.username}
                className="box-img-circleWrapper box-profileImage-ss box-margin-right-10 box-margin-bottom-10">
                <img src={member.image ? member.image : Icon} alt={member.username} className="box-profileImage-ss"/>
              </Link>
            )})
          }
        </div>
      </div>
    )
  }
}

export default ExploreSidebar