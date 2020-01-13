import React from 'react'
import './Search.css'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import CommunityCard from '../0_Components/5_Cards/1_CommunityCard'
import { getTags } from '../../services/api'
import { postTag } from '../../services/api'

let mainTags = ["Strategy", "Analytics", "Marketing & Sales", "Digital", "Technology", "Design",
  "Finance", "Operations", "Human Resources", "Legal & Compliance", "Social & Nonprofit", "Other"]

class Communities extends React.Component {
  state = {
    loading: true,
    communityTags: [],
    searchCommunity: ""
  }

  async componentDidMount() {
    let tagsRes = await getTags()
    if (tagsRes.error) return
    this.setState({ ...this.state, loading: false, communityTags: tagsRes.tags })
  }

  onChangeInput = (e) => {
    let text = e.target.value.replace(/[^A-Za-z0-9& ]/gi, '')
    this.setState({ ...this.state, [e.target.id]: text })
  }

  onNew = async () => {
    try {
      if (!this.state.searchCommunity) return

      let data = {
        tag: { name: this.state.searchCommunity }
      }
      this.setState({ ...this.state, loading: true })
      let tagRes = await postTag(data)
      if (!tagRes.error) {
        this.props.history.push(`/s/${tagRes.tag.name.replace(/\s+/g, '-').toLowerCase()}`)
      } else {
        this.setState({ ...this.state, loading: false })
      }
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    if (this.state.loading) return <LoadingPage small={true} />

    return (
      <FadeTransition>
        <div className="box-position-relative">
          <div className="box-border-bottom box-flex-row explore-searchPadding">
            <input
              value={this.state.searchCommunity}
              id="searchCommunity"
              onChange={this.onChangeInput}
              className="box-spacer box-input"
              placeholder={this.props.user ? "Search or new..." : "Search..."} />
            {this.props.user &&
              <div className="box-flex-row-center">
                <button
                  onClick={this.onNew}
                  className="box-expand-height box-button-line-gray box-text-bold box-background box-margin-left-10 box-flex-row-center box-color-mediumgray">
                  New
                </button>
              </div>
            }
          </div>
          {
            this.state.communityTags && this.state.communityTags.map((tag) => {
              if (mainTags.includes(tag.name)) return null
              if (tag.name.toLowerCase().startsWith(this.state.searchCommunity.toLowerCase()) === false) return null
              return <CommunityCard key={tag._id} data={tag} />
            })
          }
        </div>
      </FadeTransition>
    )
  }
}

export default Communities