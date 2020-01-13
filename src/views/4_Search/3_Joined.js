import React from 'react'
import './Search.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import CommunityCard from '../0_Components/5_Cards/1_CommunityCard'
import { getTagsMember } from '../../services/api'

class Joined extends React.Component {
  state = {
    loading: true,
    tags: []
  }

  async componentDidMount() {
    let memberTagsRes = await getTagsMember(this.props.user.username)
    if(memberTagsRes.error) return this.setState({ ...this.state, loading: false })
    this.setState({ ...this.state, loading: false, tags: memberTagsRes.tags })
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />
    if (!this.props.user) return <LoadingPage small={true} error="Log In" />

    return (
      <FadeTransition>
        <div className="box-position-relative">
          {
            this.state.tags && this.state.tags.map((tag) => {
              return <CommunityCard key={tag._id} data={tag} />
            })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default Joined