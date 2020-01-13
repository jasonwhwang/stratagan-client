import React from 'react'
// import { getAdviceMember } from '../../../services/api'
import Dropdown from '../../0_Components/6_Dropdown/Dropdown'

class NetworkNetwork extends React.Component {
  state = {
    show: false,
    showDropdown: false,
    dropdownVal: "Followers",
    options: ["Followers", "Following", "Communities"]
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
        Network
      </div>
    )
  }
}


export default NetworkNetwork