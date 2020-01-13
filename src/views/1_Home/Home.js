import React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class Home extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <div className="page">
        <FadeTransition>
          <div className="page-wrapper box-position-relative">
            <HelmetProvider><Helmet>
              <title>Stratagan</title>
              <meta name="description" content="Stratagan" />
            </Helmet></HelmetProvider>

            <div className="page-main">
              Home
            </div>

          </div>
        </FadeTransition>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)