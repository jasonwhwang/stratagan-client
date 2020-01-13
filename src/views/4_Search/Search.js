import React from 'react'
import './Search.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { FiXCircle, FiFilter } from "react-icons/fi"
import Main from './1_Main'
import Communities from './2_Communities'
import Advanced from './4_Advanced'
import Joined from './3_Joined'

const mapStateToProps = state => ({
  user: state.common.user,
  search: state.search
})

class Search extends React.Component {
  state = {
    loading: true,
    redirect: "/s/all"
  }
  async componentDidMount() {
    let path = localStorage.getItem("path")
    let setRedirect = path ? path : this.state.redirect
    this.setState({ ...this.state, loading: false, redirect: setRedirect })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let title = "Search"
    if (this.props.location.pathname.indexOf('/communities') === 0) title = "Communities"
    else if (this.props.location.pathname.indexOf('/advanced') === 0) title = "Advanced"

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
                <div className="box-flex-row box-flex-acenter box-tabs box-border-bottom">
                  <Link to="/search"
                    className={`${this.props.location.pathname.indexOf("/search") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Main
                  </Link>
                  <Link to="/communities"
                    className={`${this.props.location.pathname.indexOf("/communities") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                    Communities
                  </Link>
                  {this.props.user &&
                    <Link to="/joined"
                      className={`${this.props.location.pathname.indexOf("/joined") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                      Joined
                    </Link>
                  }
                  <div className="box-spacer"></div>
                  <Link to="/advanced"
                    className={`${this.props.location.pathname.indexOf("/advanced") === 0 && "box-tab-selected"} box-tab box-margin-left-10`}>
                    <FiFilter className="box-text-5" />
                  </Link>
                  <Link to={this.state.redirect}
                    className={`box-tab box-margin-right-3`}>
                    <FiXCircle className="box-text-4" />
                  </Link>
                </div>

                <div className="box-spacer box-flex-col">
                  {this.props.location.pathname === "/search" && <Main />}
                  {this.props.location.pathname === "/communities" && <Communities user={this.props.user} history={this.props.history}/>}
                  {this.props.location.pathname === "/joined" && <Joined user={this.props.user}/>}
                  {this.props.location.pathname === "/advanced" && <Advanced pathname={this.props.location.pathname} />}
                </div>
              </div>
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Search)