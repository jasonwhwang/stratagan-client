import React from 'react'
import NetworkCard from '../../0_Components/5_Cards/2_NetworkCard'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'

class ExploreNetwork extends React.Component {
  render() {
    return (
      <FadeTransition>
        <div>
          {
            this.props.list.map(user => {
              return <NetworkCard key={user.username} data={user} />
            })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default ExploreNetwork