import React from 'react'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'

class ExploreProposals extends React.Component {
  render() {
    return (
      <FadeTransition>
        <div>
          <h5 className="box-margin-left-20 box-margin-top-20">Development in progress.</h5>
          {
            this.props.proposals && this.props.proposals.map(proposal => {
              return <div>{proposal.name}</div>
            })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default ExploreProposals