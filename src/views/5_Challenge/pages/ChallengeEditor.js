import React from 'react'
import Editor from '../../0_Components/9_Editor/Editor'
import EditorButtons from '../../0_Components/9_Editor/EditorButtons'
import {
  postChallenge, deleteChallenge, getCommentsChallenge,
  postComment, deleteComment
} from '../../../services/api'
import { uploadFile, removeFile } from '../../../services/authApi'
import {
  PostImage, PostTitle, PostHeading, PostCompany, PostBookmark, PostTags,
  PostDetailsReadOnly, PostBodyPlaceholder
} from './PostComponents'
import { PostCommentButtons, PostCommentEditor, PostCommentList } from './PostComments'
import PostDetails from './PostDetails'
import ErrorBoundary from '../../0_Components/3_ErrorBoundary/ErrorBoundary'

class ChallengeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.editor = React.createRef()
  }

  state = {
    loading: true,
    loadingPage: true
  }

  async componentDidMount() {
    let newState = this.props.initialState
    if (!newState.body) newState.body = PostBodyPlaceholder
    this.setState(newState)

    let commentsRes = await getCommentsChallenge(this.props.initialState._id)
    if (commentsRes.error) return
    this.setState({ ...this.state, comments: commentsRes.comments, loading: false })
  }

  changeVal = (type, val) => {
    this.setState({ ...this.state, [type]: val })
  }

  onChangeInput = (e) => {
    let val = e.target.value.replace(/[^A-Za-z0-9&?.,! ]/gi, '')
    this.setState({ ...this.state, [e.target.id]: val })
  }

  imageHandler = async (e) => {
    const file = e.target.files[0]
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.setState({ ...this.state, error: "File type must be PNG or JPEG.", loading: false })
      return
    }
    this.setState({ ...this.state, loading: true })

    if (this.state.image) await removeFile(this.state.image)
    let response = await uploadFile(file)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
      return
    }
    this.setState({ ...this.state, image: response })
    await this.submitEditorButton()
  }

  submitEditor = async () => {
    // if (this.state.title.length === 0) return
    let delta = this.editor.current.quill.getEditor().getContents()
    let newPost = {
      sub: this.state.sub,
      image: this.state.image,
      title: this.state.title,
      heading: this.state.heading,
      body: JSON.stringify(delta),
      tags: this.state.tags,
      status: this.state.status,
      type: this.state.type,
      budget: this.state.budget,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      companySize: this.props.authUser.companySize,
      industryCategory: this.props.authUser.industryCategory
    }

    this.setState({ ...this.state, loading: true })
    let res = await postChallenge({ challenge: newPost })
    if (res.error || res.errors) {
      this.setState({
        ...this.state,
        error: res.error || "There was an error.",
        success: "",
        loading: false
      })
      return false
    } else {
      this.setState({
        ...this.state,
        sub: res.challenge.sub,
        image: res.challenge.image,
        body: res.challenge.body,
        updatedAt: res.challenge.updatedAt,
        error: "",
        success: "Successfully updated.",
        loading: false
      })
      // console.log(res)
      return res
    }
  }

  submitEditorButton = async () => {
    let res = await this.submitEditor()
    if (res) this.props.history.push(`/c/${res.challenge.sub}`)
  }

  deleteImages = async (imgArr) => {
    console.log(imgArr)
    await Promise.all(imgArr.map(async img => {
      let deleteRes = await removeFile(img)
      console.log(deleteRes)
      return
    }))
  }
  deleteCurrentPost = async () => {
    this.setState({ ...this.state, loading: true })

    if (this.state.image) await removeFile(this.state.image)
    this.setState({ ...this.state, image: "" })

    let delta = this.editor.current.quill.getEditor().getContents()
    let deleted = delta.ops.filter(i => i.insert && i.insert.image).map(i => i.insert.image)
    deleted.length && this.deleteImages(deleted)

    let res = await deleteChallenge({ challenge: { sub: this.state.sub } })
    if (res.error || res.errors) {
      this.setState({
        ...this.state,
        error: res.error || "There was an error.",
        success: "",
        loading: false
      })
    } else {
      this.props.history.push(`/m/${this.props.authUser.username}/challenges`)
    }
  }

  submitComment = async (data) => {
    this.setState({ ...this.state, commentLoading: true })
    let newData = {
      body: data,
      challengeId: this.state._id
    }
    let commentRes = await postComment({ comment: newData })
    if (commentRes.error) return

    let newComments = await getCommentsChallenge(this.props.initialState._id)
    if (newComments.error) return
    this.setState({ ...this.state, comments: newComments.comments, commentOpen: false, commentLoading: false })
  }
  deleteComment = async (data) => {
    await deleteComment({ comment: { _id: data } })
    let newComments = await getCommentsChallenge(this.props.initialState._id)
    if (newComments.error) return
    this.setState({ ...this.state, comments: newComments.comments })
  }

  render() {
    if (this.state.loadingPage) return null

    return (
      <ErrorBoundary>
        <div className="box-position-relative">
          <PostImage
            imageHandler={this.imageHandler}
            image={this.state.image}
            editorReadOnly={this.state.editorReadOnly} />

          <div className="box-flex-row box-margin-top-40 box-margin-bottom-60">
            <div className="box-spacer box-margin-right-40">
              <PostTitle
                editorReadOnly={this.state.editorReadOnly}
                onChangeInput={this.onChangeInput}
                title={this.state.title}
                type={this.props.type}
              />
              <PostHeading
                editorReadOnly={this.state.editorReadOnly}
                onChangeInput={this.onChangeInput}
                heading={this.state.heading}
                type={this.props.type}
              />
              <PostCompany author={this.state.author} />
            </div>
            <PostBookmark
              editorReadOnly={this.state.editorReadOnly}
              bookmarkedCount={this.state.bookmarkedCount}
              userBookmarked={this.state.userBookmarked}
            />
          </div>

          <div className="box-position-relative c-editorMarginBottom">
            <Editor
              text={this.state.body}
              submitEditor={this.submitEditor}
              editorReadOnly={this.state.editorReadOnly}
              changeVal={this.changeVal}
              ref={this.editor}
              editorPlaceholder={this.props.type === "challenge" ?
                "Your challenge is empty. Add text, images, & more to your challenge."
                :
                "Your proposal is empty. Write your proposal for the challenge."
              }
            />
          </div>

          <PostTags
            editorReadOnly={this.state.editorReadOnly}
            tags={this.state.tags}
            changeVal={this.changeVal}
            type={this.props.type}
          />

          {this.state.editorReadOnly ?
            <PostDetailsReadOnly
              status={this.state.status}
              type={this.state.type}
              budget={this.state.budget}
              endDate={this.state.endDate}
              author={this.state.author}
              startDate={this.state.startDate}
            />
            :
            <PostDetails
              status={this.state.status}
              type={this.state.type}
              budget={this.state.budget}
              endDate={this.state.endDate}
              startDate={this.state.startDate}
              changeVal={this.changeVal}
            />
          }

          <EditorButtons
            disabled={this.state.disabled}
            delete={this.deleteCurrentPost}
            updatedAt={this.state.updatedAt}
            editorReadOnly={this.state.editorReadOnly}
            changeVal={this.changeVal}
            submit={this.submitEditorButton}
            error={this.state.error}
            loading={this.state.loading}
            success={this.state.success}
          />

          <PostCommentButtons
            commentCount={this.state.comments.length}
            commentDisabled={this.state.commentDisabled}
            changeVal={this.changeVal}
            commentOpen={this.state.commentOpen}
            route={this.props.challenge}
          />

          <PostCommentEditor
            onSubmit={this.submitComment}
            loading={this.state.commentLoading}
            commentOpen={this.state.commentOpen} />

          <PostCommentList
            comments={this.state.comments}
            authUser={this.props.authUser}
            delete={this.deleteComment} />
        </div>
      </ErrorBoundary>
    )
  }
}

export default ChallengeEditor