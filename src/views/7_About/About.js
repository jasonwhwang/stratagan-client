import React from 'react'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './About.css'
import AboutContent from './AboutContent'

class About extends React.Component {
  state = {
    show: false
  }

  componentDidMount() {
    this.setState({ ...this.state, show: true })
  }

  render() {
    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper">
            <HelmetProvider><Helmet>
              <title>About</title>
              <meta name="description" content="About" />
            </Helmet></HelmetProvider>

            <div className="landing-main">
              <AboutContent />
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default About