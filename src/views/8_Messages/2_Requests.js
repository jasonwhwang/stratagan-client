import React from 'react'
import './Messages.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Dropdown from '../0_Components/6_Dropdown/Dropdown'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import RequestCard from '../0_Components/5_Cards/4_RequestCard'

class Requests extends React.Component {
  state = {
    loading: true,
    showDropdown1: false,
    dropdownVal1: "All",
    options1: ["All", "Challenges", "Payment"],
    showDropdown2: false,
    dropdownVal2: "New",
    options2: ["New", "Accepted", "Declined"]
  }
  componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  toggleDropdown1 = () => {
    this.setState({ ...this.state, showDropdown1: !this.state.showDropdown1, showDropdown2: false })
  }
  changeDropdown1 = (val) => {
    this.setState({ ...this.state, showDropdown1: false, dropdownVal1: val })
  }
  toggleDropdown2 = () => {
    this.setState({ ...this.state, showDropdown2: !this.state.showDropdown2, showDropdown1: false })
  }
  changeDropdown2 = (val) => {
    this.setState({ ...this.state, showDropdown2: false, dropdownVal2: val })
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />

    return (
      <FadeTransition>
        <div className="box-position-relative">
          <div className="box-flex-row-acenter box-border-top box-border-bottom box-dropdown-heading35">
            <Dropdown
              showDropdown={this.state.showDropdown1}
              toggleDropdown={this.toggleDropdown1}
              dropdownVal={this.state.dropdownVal1}
              changeDropdown={this.changeDropdown1}
              options={this.state.options1} />

            <Dropdown
              showDropdown={this.state.showDropdown2}
              toggleDropdown={this.toggleDropdown2}
              dropdownVal={this.state.dropdownVal2}
              changeDropdown={this.changeDropdown2}
              options={this.state.options2} />
          </div>

          <RequestCard />
          <RequestCard />
          <RequestCard />
          <h6 className="box-margin-left-20 box-margin-top-20">Development in progress.</h6>
        </div>
      </FadeTransition>
    )
  }
}

export default Requests