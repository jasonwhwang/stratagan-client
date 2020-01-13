import React from 'react'
import './Messages.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Notifications from './1_Notifications'
import Requests from './2_Requests'

const mapStateToProps = state => ({
  user: state.common.user
})

class Messages extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    if(!this.props.user) this.props.history.push("/")
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let title = "Messages"
    if (this.props.location.pathname.indexOf('/notifications') === 0) title = "Notifications"
    else if (this.props.location.pathname.indexOf('/requests') === 0) title = "Requests"

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
                  <Link to="/notifications"
                    className={`${this.props.location.pathname.indexOf("/notifications") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Notifications
                  </Link>
                  <Link to="/requests"
                    className={`${this.props.location.pathname.indexOf("/requests") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Requests
                  </Link>
                </div>

                <div className="box-spacer box-flex-col">
                  {this.props.location.pathname === "/notifications" && <Notifications /> }
                  {this.props.location.pathname === "/requests" && <Requests /> }
                </div>
              </div>
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Messages)