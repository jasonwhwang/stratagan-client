import React from 'react'
import './Search.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import SearchExplore from './components/SearchExplore'

class Advanced extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />

    return (
      <FadeTransition>
        <div className="box-position-relative page-padding">
          <SearchExplore pathname={this.props.pathname} />
        </div>
      </FadeTransition>
    )
  }
}

export default Advanced