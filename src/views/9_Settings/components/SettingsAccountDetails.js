import React from 'react'
import { putUser } from '../../../services/api'
import Loading from '../../0_Components/4_Loading/Loading'
import '../Settings.css'

class SettingsAccountDetails extends React.Component {
  state = {
    name: "",
    username: "",
    role: "",
    company: "",
    headline: "",
    linkedIn: "",
    website: "",
    companyWebsite: "",
    error: "",
    success: "",
    loading: false
  }

  componentDidMount() {
    let newState = this.props.user
    newState.error = this.state.error
    newState.success = this.state.success
    newState.loading = this.state.loading
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
    this.setState({ ...this.state, loading: true })
    let res = await putUser({ user: this.state })
    if (res.error) {
      this.setState({ ...this.state, success: "", error: res.error, loading: false })
    } else {
      this.props.changeUser(res.user)
      this.setState({ ...this.state, error: "", success: "Successfully updated account.", loading: false })
    }
  }

  render() {
    return (
      <div className="box-margin-bottom-40">
        <form className="page-padding" onSubmit={this.onSubmitForm}>
          <h4 className="box-text-bold box-margin-bottom-20">Account Details</h4>

          <input
            id="name"
            type="text"
            maxLength="50"
            autoComplete="name"
            className="box-input box-margin-bottom-20"
            onChange={this.onChangeInput}
            value={this.state.name}
            placeholder="Name" />

          <div className="box-flex-row box-flex-acenter box-margin-bottom-20">
            <h6 className="box-text-nobold box-margin-right-10">
              stratagan.com/m/
            </h6>
            <input
              id="username"
              type="text"
              maxLength="50"
              required={true}
              autoComplete="username"
              className="box-input box-spacer box-text-lowercase"
              onChange={this.onChangeInput}
              value={this.state.username}
              placeholder="username" />
          </div>

          <div className="box-flex-row box-flex-acenter box-margin-bottom-40">
            <input
              id="role"
              type="text"
              maxLength="50"
              className="box-input box-spacer"
              onChange={this.onChangeInput}
              value={this.state.role}
              placeholder="Role" />
            <h4 className="box-text-nobold box-margin-left-10 box-margin-right-10">
              @
            </h4>
            <input
              id="company"
              type="text"
              maxLength="50"
              className="box-input box-spacer"
              onChange={this.onChangeInput}
              value={this.state.company}
              placeholder="Company" />
          </div>

          <textarea
            id="headline"
            type="text"
            maxLength="300"
            className="box-input box-margin-bottom-40"
            rows="3"
            onChange={this.onChangeInput}
            value={this.state.headline}
            placeholder="Headline" />

          <div className="box-flex-row box-flex-acenter box-margin-bottom-20">
            <h6 className="box-text-nobold box-margin-right-10 settings-labelMinWidth">
              LinkedIn
            </h6>
            <input
              id="linkedIn"
              type="url"
              maxLength="75"
              className="box-input box-spacer"
              onChange={this.onChangeInput}
              value={this.state.linkedIn}
              placeholder="https://www.linkedin.com/in/username" />
          </div>
          <div className="box-flex-row box-flex-acenter box-margin-bottom-20">
            <h6 className="box-text-nobold box-margin-right-10 settings-labelMinWidth">
              Website
            </h6>
            <input
              id="website"
              type="url"
              maxLength="50"
              className="box-input box-spacer"
              onChange={this.onChangeInput}
              value={this.state.website}
              placeholder="https://www.website.com" />
          </div>
          <div className="box-flex-row box-flex-acenter box-margin-bottom-40">
            <h6 className="box-text-nobold box-margin-right-10 settings-labelMinWidth">
              Company
            </h6>
            <input
              id="companyWebsite"
              type="url"
              maxLength="50"
              className="box-input box-spacer"
              onChange={this.onChangeInput}
              value={this.state.companyWebsite}
              placeholder="https://www.companywebsite.com" />
          </div>

          <div className="box-flex-row">
            <div><button
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Update Account
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

export default SettingsAccountDetails