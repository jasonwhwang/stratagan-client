import React from 'react'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

class SettingsPayments extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    // let payments = await getPayments()
    this.setState({ ...this.state, loading: false })
  }
  render() {
    if(this.state.loading) return <LoadingPage small={true} />
    return (
      <div className="box-spacer page-padding">
        <h5>Payments functionality in development.</h5>
      </div>
    )
  }
}

export default SettingsPayments