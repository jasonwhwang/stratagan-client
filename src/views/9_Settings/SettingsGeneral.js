import React from 'react'
import SettingsChangePassword from './components/SettingsChangePassword'
import SettingsImageUpload from './components/SettingsImageUpload'
import SettingsAccountDetails from './components/SettingsAccountDetails'
import SettingsIndustry from './components/SettingsIndustry'
import SettingsCompanySize from './components/SettingsCompanySize'
import SettingsAddress from './components/SettingsAddress'
import SettingsTags from './components/SettingsTags'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { getUser } from '../../services/api'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  changeUser: (user) =>
    dispatch({ type: "USER", user })
});

class SettingsGeneral extends React.Component {
  state = {
    user: null,
    error: ""
  }
  changeUser = (user) => {
    this.setState({ ...this.state, user: user })
    this.props.changeUser(user)
  }
  async componentDidMount() {
    let userRes = await getUser()
    if (userRes.error) this.setState({ ...this.state, error: userRes.error })
    else this.changeUser(userRes.user)
  }
  render() {
    if (this.state.user === null) return <LoadingPage small={true} />
    return (
      <FadeTransition>
        <div>
          <SettingsAccountDetails user={this.state.user} changeUser={this.changeUser} />
          <SettingsImageUpload user={this.state.user} changeUser={this.changeUser} />
          <SettingsAddress user={this.state.user} changeUser={this.changeUser} />
          <SettingsIndustry user={this.state.user} changeUser={this.changeUser} />
          <SettingsCompanySize user={this.state.user} changeUser={this.changeUser} />
          <SettingsTags user={this.state.user} changeUser={this.changeUser} />
          <SettingsChangePassword />
        </div>
      </FadeTransition>
    )
  }
}

export default connect(null, mapDispatchToProps)(SettingsGeneral)