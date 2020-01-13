import React from 'react'
import { putUser } from '../../../services/api'
import Loading from '../../0_Components/4_Loading/Loading'
import '../Settings.css'
import Tags from '../../0_Components/8_Tags/Tags'

class SettingsTags extends React.Component {
  state = {
    showDropdown: false,
    tags: [],
    error: "",
    success: "",
    loading: false
  }

  changeVal = (type, val) => {
    this.setState({ ...this.state, [type]: val })
  }

  componentDidMount() {
    let newState = this.state
    newState.tags = this.props.user.tags ? this.props.user.tags : []
    this.setState(newState)
  }

  changeLoading = (val) => {
    this.setState({ ...this.state, loading: val })
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    this.changeLoading(true)
    let res = await putUser({ user: this.state })
    if (res.error) {
      this.setState({ ...this.state, error: res.error })
    } else {
      this.props.changeUser(res.user)
      this.setState({ ...this.state, success: "Successfully updated communities." })
    }
    this.changeLoading(false)
  }

  render() {
    return (
      <div className="box-margin-bottom-40">
        <div className="page-padding">
          <h4 className="box-text-bold box-margin-bottom-20">Communities</h4>

          <div className="box-margin-bottom-20">
            <Tags tags={this.state.tags} changeVal={this.changeVal} allowNew={true}/>
          </div>

          <div className="box-flex-row">
            <div><button onClick={this.onSubmitForm}
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Update Communities
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
        </div>
      </div>
    )
  }
}

export default SettingsTags