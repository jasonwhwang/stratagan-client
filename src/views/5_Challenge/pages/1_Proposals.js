import React from 'react'
import { Link } from 'react-router-dom'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './ChallengePages.css'
import { FaLongArrowAltUp } from "react-icons/fa"
import Icon from '../../../img/stratagan-icon.png'
import PlaceImage from '../../../img/placeholder.svg'

class Proposals extends React.Component {
  state = {
    loading: true,
    list: []
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading || this.state.error) return <LoadingPage small={true} error={this.state.error} />
    
    return (
      <FadeTransition>
        <div className="box-position-relative box-spacer box-flex-col">
          <HelmetProvider><Helmet>
            <title>{this.state.title ? this.state.title : "Proposals"}</title>
            <meta name="description" content={this.state.title ? this.state.title : "Proposals"} />
          </Helmet></HelmetProvider>

          <div className="box-spacer box-margin-top-10 box-container box-shadow-lite">
            <div className="box-list card-padding box-flex-row box-flex-acenter box-border-bottom">
              <Link to={`/p/proposalname`}
                className="box-flex-row box-flex-acenter box-color-black box-flex-2">

                <div className='card-br-5 box-img-rectangleWrapper box-profileImage-l box-flex-row-center box-margin-right-20'>
                  <img
                    src={PlaceImage}
                    alt='Challenge'
                    className='box-img-circle'
                    draggable="false" />
                </div>

                <div>
                  <h5 className="box-text-5">Title of Proposal</h5>
                  <h6 className="box-text-6 box-text-nobold">Description of proposal and a single statement.</h6>
                </div>
              </Link>

              <Link to={`/m/username`}
                className="box-flex-row box-flex-acenter box-color-black box-margin-left-20 box-spacer">
                <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
                  <img src={Icon}
                    className="box-img-circle" alt="Member" draggable="false" />
                </div>
                <div>
                  <h6 className="box-text-7">Firstname Lastname</h6>
                  <h6 className="box-text-8 box-text-nobold">A Role @ Tech Company</h6>
                </div>
              </Link>
              <div className="box-flex-row-center">
                <button className="box-button-line-gray box-background-white box-flex-row-center">
                  <FaLongArrowAltUp className="box-text-7" />
                  <span className="box-margin-left-3">35</span>
                </button>
              </div>
            </div>

            <h6 className="box-margin-top-20 box-margin-left-20">Proposals development in progress. Proposal page will look similar to the challenge page.</h6>
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default Proposals