import React from 'react'
import { putUser } from '../../../services/api'
import Loading from '../../0_Components/4_Loading/Loading'
import '../Settings.css'
import Dropdown from '../../0_Components/6_Dropdown/Dropdown'

class SettingsIndustry extends React.Component {
  state = {
    showDropdown: false,
    industryCategory: "Unspecified",
    options: [
      "Unspecified",
      "Consumer Goods",
      "Engineering",
      "Entertainment & Media",
      "Financial",
      "Healthcare",
      "Hospitality & Leisure",
      "Industrial",
      "Professional",
      "Retail",
      "Software",
      "Technology",
      "Other"],
    industryName: "",
    error: "",
    success: "",
    loading: false
  }

  toggleDropdown = () => {
    this.setState({ ...this.state, showDropdown: !this.state.showDropdown })
  }
  changeDropdown = (val) => {
    this.setState({ ...this.state, showDropdown: false, industryCategory: val })
  }

  componentDidMount() {
    let newState = this.state
    newState.industryCategory = this.props.user.industryCategory ? this.props.user.industryCategory : "Unspecified"
    newState.industryName = this.props.user.industryName
    this.setState(newState)
  }

  changeLoading = (val) => {
    this.setState({ ...this.state, loading: val })
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    this.changeLoading(true)
    let res = await putUser({ user: this.state })
    if (res.error) {
      this.setState({ ...this.state, error: res.error })
    } else {
      this.props.changeUser(res.user)
      this.setState({ ...this.state, success: "Successfully updated industry." })
    }
    this.changeLoading(false)
  }

  render() {
    return (
      <div className="box-margin-bottom-40">
        <form className="page-padding" onSubmit={this.onSubmitForm}>
          <h4 className="box-text-bold box-margin-bottom-20">Industry</h4>

          <div className="box-flex-row box-flex-acenter box-margin-bottom-20">
            <Dropdown
              showDropdown={this.state.showDropdown}
              toggleDropdown={this.toggleDropdown}
              dropdownVal={this.state.industryCategory}
              changeDropdown={this.changeDropdown}
              options={this.state.options} />
            <input
              id="industryName"
              type="text"
              maxLength="100"
              className="box-margin-left-5 box-input"
              onChange={this.onChangeInput}
              value={this.state.industryName}
              placeholder="Industry Name" />
          </div>

          <div className="box-flex-row">
            <div><button
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Update Industry
            </button></div>

            {
              this.state.error !== "" && !this.state.loading &&
              <h6 className="box-text-8 box-color-red box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
                {this.state.error}
              </h6>
            }
            {
              this.state.success !== "" && !this.state.loading &&
              <h6 className="box-text-8 box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
                {this.state.success}
              </h6>
            }
            {
              this.state.loading && <div className="box-margin-left-20"><Loading small={true} /></div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default SettingsIndustry