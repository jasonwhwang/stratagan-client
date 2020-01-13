import React from 'react'
import './Settings.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { logOut } from '../../services/authApi'
import SettingsPayments from './SettingsPayments'
import SettingsGeneral from './SettingsGeneral'

const mapStateToProps = state => ({
  user: state.common.user
})

class Settings extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    if (!this.props.user) this.props.history.push("/")
    this.setState({ ...this.state, loading: false })
  }

  logoutUser = async () => {
    await logOut()
    this.props.history.push("/")
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let title = "Settings"
    if (this.props.location.pathname.indexOf('/payments') === 0) title = "Payments"

    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper box-position-relative">
            <HelmetProvider><Helmet>
              <title>{title}</title>
              <meta name="description" content={title} />
            </Helmet></HelmetProvider>

            <div className="page-main box-flex-col">
              <div className="box-spacer box-flex-col box-container box-shadow-lite">
                <div className="box-flex-row box-flex-acenter box-tabs">
                  <Link to="/settings"
                    className={`${this.props.location.pathname === "/settings" && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Account
                  </Link>
                  <Link to="/payments"
                    className={`${this.props.location.pathname === "/payments" && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Payments
                  </Link>
                  <div className="box-spacer"></div>
                  <button
                    onClick={this.logoutUser}
                    className="box-button-heading box-text-8 box-flex-row box-flex-acenter">
                    Log out
                  </button>
                </div>

                <div className="box-spacer box-flex-col">
                  {this.props.location.pathname === "/settings" && <SettingsGeneral />}
                  {this.props.location.pathname === "/payments" && <SettingsPayments />}
                </div>
              </div>
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Settings)