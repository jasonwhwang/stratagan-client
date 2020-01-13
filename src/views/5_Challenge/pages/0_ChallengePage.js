import React from 'react'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { getChallenge } from '../../../services/api'
import ChallengeEditor from './ChallengeEditor'

class ChallengePage extends React.Component {
  state = {
    loading: true,
    loadingPage: true,

    disabled: true,
    editorReadOnly: true,
    commentDisabled: true,
    commentReadOnly: true,
    commentOpen: false,
    commentLoading: false,

    sub: null,
    image: "",
    title: "",
    heading: "",
    body: "",
    author: null,
    budget: "0",
    status: "Draft",
    type: "Consulting",
    startDate: null,
    endDate: null,

    tags: [],
    updatedAt: "",
    comments: [],
    bookmarkedCount: 0,
    userBookmarked: false
  }

  initializePage = async () => {
    let currState = this.state
    if (this.props.challenge === "new") {
      currState.disabled = false
      currState.editorReadOnly = false
      currState.author = this.props.authUser
      currState.loading = false
      currState.loadingPage = false
      this.setState(currState)
      return
    } else {
      // Get post using route and subpage params
      let postRes = await getChallenge(this.props.challenge)
      if (postRes.error) {
        this.setState({ ...this.state, error: "Page Not Found", loading: false })
        return
      }

      currState = { ...currState, ...postRes.challenge }
      if (currState.startDate) currState.startDate = new Date(currState.startDate)
      if (currState.endDate) currState.endDate = new Date(currState.endDate)

      if (this.props.authUser && postRes.challenge.author.username === this.props.authUser.username) {
        currState.disabled = false
      } else {
        currState.commentDisabled = false
        currState.commentReadOnly = false
      }
      currState.loading = false
      currState.loadingPage = false
      this.setState(currState)
      return
    }
  }

  componentDidMount() {
    this.initializePage()
  }

  render() {
    if (this.state.loading || this.state.error) return <LoadingPage small={true} error={this.state.error} />

    return (
      <FadeTransition>
        <div className="box-position-relative c-extraBottomPadding">
          <HelmetProvider><Helmet>
            <title>{this.state.title ? this.state.title : "New Challenge"}</title>
            <meta name="description" content={this.state.title ? this.state.title : "New Challenge"} />
          </Helmet></HelmetProvider>

          <ChallengeEditor
            initialState={this.state}
            type={this.props.type}
            challenge={this.props.challenge}
            authUser={this.props.authUser}
            history={this.props.history} />

        </div>
      </FadeTransition>
    )
  }
}

export default ChallengePage