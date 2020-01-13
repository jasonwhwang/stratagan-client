import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { connect } from 'react-redux'
import './Network.css'
import NetworkSidebar from './NetworkSidebar'
import NetworkMain from './NetworkMain'
import { getUser, getMember } from '../../services/api'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'

const mapStateToProps = state => ({
  authUser: state.common.user
})

class Network extends React.Component {
  state = {
    user: null,
    error: ""
  }

  setUser = async () => {
    let userRes = null
    if (this.props.match.params.username) userRes = await getMember(this.props.match.params.username)
    else userRes = await getUser()

    if (userRes && userRes.error) this.setState({ ...this.state, error: userRes.error })
    else if (userRes && userRes.user) this.setState({ ...this.state, user: userRes.user })
  }

  componentDidMount() {
    this.setUser()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) this.setUser()
  }

  render() {
    if (!this.state.user) return <LoadingPage error={this.state.error} />

    let title = this.state.user.name
    let pathTitle = null
    if(this.props.location.pathname.indexOf("/challenges") !== -1) {
      pathTitle = " - Challenges"
    } else if(this.props.location.pathname.indexOf("/network") !== -1) {
      pathTitle = " - Network"
    }
    if(pathTitle) title = title + pathTitle

    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper box-position-relative">
            <HelmetProvider><Helmet>
              <title>{title}</title>
              <meta name="description" content={title} />
            </Helmet></HelmetProvider>

            <div className="page-main-wide box-flex-row">
              <NetworkSidebar user={this.state.user} />
              <NetworkMain
                location={this.props.location}
                match={this.props.match}
                user={this.state.user}
                authUser={this.props.authUser}
              />
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Network)