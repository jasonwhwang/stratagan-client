import React from 'react'
import './Messages.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import NotificationCard from '../0_Components/5_Cards/3_NotificationCard'
import Dropdown from '../0_Components/6_Dropdown/Dropdown'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'

class Notifications extends React.Component {
  state = {
    loading: true,
    showDropdown: false,
    dropdownVal: "All",
    options: ["All", "Challenges", "Members"]
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }
  toggleDropdown = () => {
    this.setState({ ...this.state, showDropdown: !this.state.showDropdown })
  }
  changeDropdown = (val) => {
    this.setState({ ...this.state, showDropdown: false, dropdownVal: val })
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />

    return (
      <FadeTransition>
        <div className="box-position-relative">
          <div className="box-flex-row-acenter box-border-top box-border-bottom box-dropdown-heading35">
            <Dropdown
              showDropdown={this.state.showDropdown}
              toggleDropdown={this.toggleDropdown}
              dropdownVal={this.state.dropdownVal}
              changeDropdown={this.changeDropdown}
              options={this.state.options} />
          </div>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
      </FadeTransition>
    )
  }
}

export default Notifications