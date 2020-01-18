import React from 'react'
import { Link } from 'react-router-dom'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './ChallengePages.css'
import Icon from '../../../img/stratagan-icon.png'


class Updates extends React.Component {
  state = {
    loading: true,
    list: []
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading || this.state.error) return <LoadingPage small={true} error={this.state.error} />

    let linkPath = this.props.linkPath + "/updates"
    let headline = this.props.authUser.role + " @ " + this.props.authUser.company


    return (
      <FadeTransition>
        <div className="box-position-relative box-spacer box-flex-col">
          <HelmetProvider><Helmet>
            <title>{this.state.title ? this.state.title : "Updates"}</title>
            <meta name="description" content={this.state.title ? this.state.title : "Updates"} />
          </Helmet></HelmetProvider>

          <div className="box-spacer box-flex-row box-margin-top-10 box-container box-shadow-lite request-padding">
            <div className="members-sidebar">
              <h6 className="box-text-nobold box-margin-bottom-10 box-text-8 box-text-uppercase">
                Challenge Lead
              </h6>
              <Link to={`/m/${this.props.authUser.username}`}
                className="box-flex-row box-flex-acenter box-color-black box-margin-bottom-30">
                <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
                  <img src={this.props.authUser.image ? this.props.authUser.image : Icon}
                    className="box-img-circle" alt="Member" draggable="false" />
                </div>
                <div>
                  <h5 className="">{this.props.authUser.name}</h5>
                  <h6 className="box-text-7 box-text-nobold">{headline}</h6>
                </div>
              </Link>

              <h6 className="box-text-nobold box-margin-bottom-10 box-text-8 box-text-uppercase">
                Members
              </h6>
              <Link to={`/m/username`}
                className="box-flex-row box-flex-acenter box-color-black box-margin-bottom-20">
                <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
                  <img src={Icon}
                    className="box-img-circle" alt="Member" draggable="false" />
                </div>
                <div>
                  <h6 className="box-text-7">Firstname Lastname</h6>
                  <h6 className="box-text-8 box-text-nobold">Role @ Company</h6>
                </div>
              </Link>
            </div>

            <div className="box-spacer box-margin-left-20">
              <div className="box-flex-between box-flex-acenter box-margin-bottom-10">
                <Link to={linkPath}
                  className={`${this.props.location.pathname === linkPath && "box-color-black"} box-tab`}>
                  Updates
                </Link>
              </div>

              <div className="box-border-bottom box-border-top">
                <Link to={`/m/username`}
                  className="box-flex-row box-flex-acenter box-color-black box-margin-left-20 box-margin-top-20 box-margin-bottom-10">
                  <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
                    <img src={Icon}
                      className="box-img-circle" alt="Member" draggable="false" />
                  </div>
                  <div>
                    <h6 className="box-text-7">Firstname Lastname</h6>
                  </div>
                </Link>

                <p className="box-margin-bottom-20 box-margin-left-20 box-lineheight0">
                  Updates will go here. They will be updates from the members to the public or from members to other members of the group.
                </p>

                <p className="box-text-7 box-color-gray box-text-bold box-margin-bottom-20 box-margin-left-20 ">January 1, 2020</p>
              </div>

              <h6 className="box-margin-top-30 box-margin-left-10">Updates development in progress.</h6>

            </div>
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default Updates