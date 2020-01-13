import React from 'react'
import './Search.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import { getTagsMain } from '../../services/api'
import CommunityCard from '../0_Components/5_Cards/1_CommunityCard'

class Main extends React.Component {
  state = {
    loading: true,
    mainTags: []
  }

  async componentDidMount() {
    try {
      let mainTagsRes = await getTagsMain()
      if(mainTagsRes.error) {
        this.setState({ ...this.state, loading: false })
      } else {
        this.setState({ ...this.state, loading: false, mainTags: mainTagsRes.tags })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />

    return (
      <FadeTransition>
        <div className="box-position-relative">
          {
            this.state.mainTags && this.state.mainTags.map((tag) => {
              return <CommunityCard key={tag._id} data={tag} />
            })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default Main