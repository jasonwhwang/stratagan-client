import React from 'react'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea'
import Icon from '../../../img/stratagan-icon.png'
import { FiMessageCircle, FiTrash2, FiThumbsUp } from "react-icons/fi"
import Loading from '../../0_Components/4_Loading/Loading'


const PostCommentButtons = (props) => {
  if (props.route === 'new') return null
  let commentCount = props.commentCount ? props.commentCount : 0
  let comment = commentCount === 1 ? " Comment" : " Comments"
  return (
    <div className="box-margin-top-60 box-margin-bottom-10 box-flex-row box-flex-acenter box-border-bottom c-commentBarHeight">
      <h5>{commentCount + comment}</h5>
      <div className="box-spacer"></div>
      {
        !props.commentDisabled &&
        <button onClick={() => props.changeVal("commentOpen", !props.commentOpen)}
          className="box-button box-flex-row-center">
          <FiMessageCircle className="box-margin-right-5" />
          Comment
        </button>
      }
    </div>
  )
}

class PostCommentEditor extends React.Component {
  state = {
    commentEditor: ""
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  submitComment = () => {
    this.props.onSubmit(this.state.commentEditor)
  }

  render() {
    if (!this.props.commentOpen) return null
    if (this.props.loading) {
      return (
        <div className="c-commentContainerHeight box-flex-row-center box-margin-bottom-30">
          <Loading />
        </div>
      )
    }

    return (
      <div className="box-margin-bottom-30 c-commentContainerHeight">
        <TextareaAutosize
          id="commentEditor"
          placeholder="Write a comment..."
          value={this.state.comment}
          onChange={this.onChangeInput}
          rows={5}
          maxLength="1000"
          className={`box-input box-lineheight0`} />
        <div className="box-flex-row box-flex-end box-margin-top-10">
          <button onClick={this.submitComment} className="box-button-line-gray box-background">
            Submit
          </button>
        </div>
      </div>
    )
  }
}

class PostComment extends React.Component {
  state = {
    likes: 0,
    userLiked: false
  }
  componentDidMount() {
    this.setState({ ...this.state, likes: this.props.likes, userLiked: this.props.userLiked })
  }

  onSubmitLike = async () => {
    // let likeRes = await likeComment()
    // if(likeRes.error) return
    // else this.setState({ ...this.state, likes: likeRes.likes, userLiked: likeRes.userLiked })
  }

  deleteComment = () => {
    this.props.delete(this.props._id)
  }

  render() {
    let headline = this.props.author.name + ", " + this.props.author.role + " @ " + this.props.author.company

    let textDate = null
    if (this.props.updatedAt) {
      let date = new Date(this.props.updatedAt)
      let month = date.toLocaleString('default', { month: 'long' })
      let day = date.getDate()
      let year = date.getFullYear()
      textDate = `${month} ${day}, ${year}`
    }

    return (
      <div className="box-position-relative box-margin-top-40 box-margin-bottom-40">
        <Link to={`/m/${this.props.author.username}`}
          className="box-flex-row box-flex-acenter box-color-black box-margin-bottom-20">
          <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
            <img src={this.props.author.image ? this.props.author.image : Icon}
              className="box-img-circle" alt="Member" draggable="false" />
          </div>
          <h6 className="box-text-nobold">{headline}</h6>
        </Link>

        <p className="box-margin-bottom-20 box-lineheight-0">{this.props.body}</p>

        <div className="box-flex-row box-flex-acenter">
          <h6 className="box-text-8 box-text-nobold">{textDate}</h6>
          <div className="box-spacer"></div>
          {this.props.authUser.username === this.props.author.username &&
            <button onClick={this.deleteComment}
              className="box-margin-right-20 box-margin-top-3">
              <FiTrash2 />
            </button>
          }
          <button onClick={this.onSubmitLike}
            className={`${this.state.userLiked && "box-button-line-graySelected"} box-button-line-gray box-text-bold box-flex-row-center box-text-8`}>
            <FiThumbsUp className="c-thumbIconMargin"/>
            <span className="box-margin-left-5">{this.state.likes}</span>
          </button>
        </div>
      </div>
    )
  }
}

const PostCommentList = (props) => {
  return (
    <div className="box-position-relative">
      {props.comments.map(comment => {
        return <PostComment {...comment} key={comment._id} delete={props.delete} authUser={props.authUser}/>
      })}
    </div>
  )
}


export {
  PostCommentButtons,
  PostCommentEditor,
  PostCommentList
}