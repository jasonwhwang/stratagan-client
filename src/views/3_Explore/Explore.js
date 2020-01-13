import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import './Explore.css'
import ExploreSidebar from './ExploreSidebar'
import ExploreMain from './ExploreMain'

class Explore extends React.Component {
  componentDidMount() {
    localStorage.setItem("path", this.props.location.pathname)
  }
  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) localStorage.setItem("path", this.props.location.pathname)
  }

  render() {
    let community = this.props.match.params.route ? this.props.match.params.route : "Explore"
    community = community
      .replace(/-/g, ' ')
      .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    if(community === "All") community = "All Communities"

    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper box-position-relative">
            <HelmetProvider><Helmet>
              <title>{community}</title>
              <meta name="description" content={community} />
            </Helmet></HelmetProvider>

            <div className="page-main-wide box-flex-row">
              <ExploreSidebar 
                community={community}
                route={this.props.match.params.route}/>
              <ExploreMain
                location={this.props.location}
                community={community}
                route={this.props.match.params.route}/>
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default Explore