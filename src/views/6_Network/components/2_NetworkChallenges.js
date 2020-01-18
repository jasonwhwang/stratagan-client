import React from 'react'
// import { getAdviceMember } from '../../../services/api'
import Dropdown from '../../0_Components/6_Dropdown/Dropdown'
import ChallengeCard from '../../0_Components/5_Cards/0_ChallengeCard'

class NetworkChallenges extends React.Component {
  state = {
    show: false,
    showDropdown: false,
    dropdownVal: "Challenges",
    options: ["Challenges", "Proposals", "Comments", "Bookmarked", "Upvoted", "Liked"]
  }
  toggleDropdown = () => {
    this.setState({ ...this.state, showDropdown: !this.state.showDropdown })
  }
  changeDropdown = (val) => {
    this.setState({ ...this.state, showDropdown: false, dropdownVal: val })
  }

  async componentDidMount() {
    // let adviceUser = await getAdviceMember(this.props.user.username)
    // console.log(adviceUser)
  }

  render() {
    return (
      <div className="box-position-relative">
        <div className="box-flex-row box-border-top box-border-bottom box-dropdown-heading35">
          <Dropdown
            showDropdown={this.state.showDropdown}
            toggleDropdown={this.toggleDropdown}
            dropdownVal={this.state.dropdownVal}
            changeDropdown={this.changeDropdown}
            options={this.state.options} />
        </div>
        <ChallengeCard />
        <h6 className="box-margin-left-20 box-margin-top-20">Development in progress.</h6>
      </div>
    )
  }
}


export default NetworkChallenges