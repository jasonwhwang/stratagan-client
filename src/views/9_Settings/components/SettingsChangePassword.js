import React from 'react'
import { changePassword } from '../../../services/authApi'
import Loading from '../../0_Components/4_Loading/Loading'

class SettingsChangePassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    error: "",
    success: "",
    loading: false
  }

  changeLoading = (val) => {
    this.setState({ ...this.state, loading: val })
  }
  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    if (this.state.oldPassword === "" || this.state.newPassword === "") {
      this.setState({ ...this.state, error: "Missing required fields." })
      return
    }
    
    this.changeLoading(true)
    let response = null
    response = await changePassword(this.state.oldPassword, this.state.newPassword)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, success: "", loading: false })
    } else {
      this.setState({ ...this.state, oldPassword: "", newPassword: "",  error: "", loading: false, success: "Password successfully changed." })
    }
  }

  componentDidUpdate() {
    if (this.state.success !== "" && (this.state.oldPassword || this.state.newPassword)) {
      this.setState({ ...this.state, error: "", success: "" })
    }
  }

  render() {
    return (
      <div className="">
        <form className="page-padding" onSubmit={this.onSubmitForm}>
          <h4 className="box-text-bold box-margin-bottom-20">Password</h4>
          <input
            id="oldPassword"
            type="password"
            maxLength="50"
            autoComplete="current-password"
            className="box-input box-margin-bottom-20"
            onChange={this.onChangeInput}
            value={this.state.oldPassword}
            placeholder="Old Password" />
          <input
            id="newPassword"
            type="password"
            maxLength="50"
            autoComplete="new-password"
            className="box-input box-margin-bottom-20"
            onChange={this.onChangeInput}
            value={this.state.newPassword}
            placeholder="New Password" />

          <div className="box-flex-row">
            <div><button
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Change Password
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
              this.state.loading && <div className="box-margin-left-20"><Loading small={true}/></div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default SettingsChangePassword