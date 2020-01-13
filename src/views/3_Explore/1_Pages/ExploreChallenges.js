import React from 'react'
import ChallengeCard from '../../0_Components/5_Cards/0_ChallengeCard'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'

class ExploreChallenges extends React.Component {
  render() {
    return (
      <FadeTransition>
        <div>
          {this.props.list.map(challenge => {
            return <ChallengeCard key={challenge.sub} data={challenge} />
          })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default ExploreChallenges