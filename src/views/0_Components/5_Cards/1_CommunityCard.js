import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

class CommunityCard extends React.Component {
  render() {
    let countLabel = this.props.data.countMembers === 1 ? "Member" : "Members"
    return (
      <Link to={`/s/${this.props.data.name.replace(/\s+/g, '-').toLowerCase()}`}
        className={`box-color-black box-list box-border-bottom card-padding
        box-flex-row box-flex-acenter`}>
        <div className="box-spacer box-margin-right-20">
          <h4 className="box-margin-bottom-3">{this.props.data.name}</h4>
          <h6 className="box-text-nobold">{this.props.data.description}</h6>
        </div>

        <div className="box-flex-row box-flex-acenter">
          <h6 className="box-text-bold box-margin-right-5">{this.props.data.countMembers}</h6>
          <h6 className="box-text-7 box-text-nobold">{countLabel}</h6>
        </div>
      </Link>
    )
  }
}

export default CommunityCard