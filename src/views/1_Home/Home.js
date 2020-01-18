import React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
// import PlaceImage from '../../img/placeholder.svg'
import AboutContent from '../7_About/AboutContent'

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

            {/* <HomeContent /> */}
            <AboutContent />

          </div>
        </FadeTransition>
      </div>
    )
  }
}

// const HomeContent = (props) => {
//   return (
//     <div className="page-main home-width">
//       <h2 className="box-margin-top-60 box-margin-bottom-40 box-text-uppercase">Strategy</h2>
//       <div className="box-flex-row">
//         <img
//           src={PlaceImage}
//           alt={"Main Challenge"}
//           className="home-image" />

//         <div className="box-spacer box-margin-left-60">
//           <h3 className="box-text-nobold box-text-uppercase box-margin-bottom-10">
//             Challenge Title
//                   </h3>
//           <h1 className="box-text-0 box-lineheight0">
//             Challenge description goes here. It will outline what the challenge is about.
//                   </h1>
//         </div>
//       </div>
//     </div>
//   )
// }

export default connect(mapStateToProps)(Home)