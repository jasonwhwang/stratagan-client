import React from 'react'
import { FiBookmark } from "react-icons/fi"
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea'
import Tags from '../../0_Components/8_Tags/Tags'
import Icon from '../../../img/stratagan-icon.png'
import PlaceImage from '../../../img/placeholder.svg'
import Image from '../../../img/stratagan.png'
import Pill from '../../0_Components/5_Cards/5_Pill'
import { FiMessageCircle } from "react-icons/fi"
import Loading from '../../0_Components/4_Loading/Loading'

const PostImage = (props) => {
  if (props.editorReadOnly) {
    return (
      <div className="c-imageWrapper box-flex-row-center box-margin-bottom-30">
        <img alt="Challenge" className="c-image" src={props.image ? props.image : PlaceImage} />
      </div>
    )
  }

  return (
    <div className="">
      <label htmlFor="post-image">
        <div className="c-imageWrapper box-flex-row-center box-margin-bottom-30">
          <img alt="Challenge" className="c-image" src={props.image ? props.image : PlaceImage} />
        </div>
      </label>

      <input className="box-display-none" id="post-image"
        type="file" onChange={props.imageHandler} />
    </div>
  )
}

const PostTitle = (props) => {
  return (
    <div className="box-margin-bottom-5">
      {
        !props.editorReadOnly &&
        <input
          id="title"
          placeholder={props.type === "challenge" ? "Challenge Title" : "Proposal Title"}
          value={props.title}
          onChange={props.onChangeInput}
          maxLength="50"
          type="text"
          className={`box-text-3 box-text-nobold c-titleHeight`} />
      }
      {
        props.editorReadOnly &&
        <h3 className="box-text-nobold box-text-uppercase c-titleHeight box-flex-row box-flex-acenter">
          {props.title ? props.title : "No Challenge Title"}
        </h3>
      }
    </div>
  )
}
const PostHeading = (props) => {
  return (
    <div className="box-margin-bottom-30">
      {
        !props.editorReadOnly &&
        <TextareaAutosize
          id="heading"
          placeholder={props.type === "challenge" ? "Add a heading that describes your challenge."
            : "Add a heading that describes your proposal."}
          value={props.heading}
          onChange={props.onChangeInput}
          rows={1}
          maxRows={3}
          maxLength="100"
          className={`box-text-1 box-text-extraBold c-headingHeight`} />
      }
      {
        props.editorReadOnly &&
        <h1 className="c-headingHeight box-lineheight0">
          {props.heading ? props.heading : "This challenge does not have a heading."}
        </h1>
      }
    </div>
  )
}

const PostCompany = (props) => {
  return (
    <div>
      <h6 className="box-text-nobold box-margin-bottom-10">Sponsored by</h6>
      <Link to={`/m/${props.author.username}`}
        className="box-flex-row box-flex-acenter box-margin-bottom-20">
        <div className="box-img-rectangleWrapper box-companyImage-m card-br-5 box-shadow-lite">
          <img
            alt={props.author.company}
            className="box-img-rectangle"
            src={props.author.companyImage ? props.author.companyImage : Image} />
        </div>
        <div className="box-margin-left-20">
          <h5 className="box-color-black">
            {props.author.company}
          </h5>
        </div>
      </Link>
    </div>
  )
}

const PostAuthor = (props) => {
  return (
    <Link to={`/m/${props.author.username}`}
      className="box-flex-row box-flex-acenter box-margin-bottom-20">
      <div className="box-img-circleWrapper box-profileImage-s">
        <img
          className="box-img-circle"
          alt={props.author.name}
          src={props.author.image ? props.author.image : Icon} />
      </div>
      <div className="box-margin-left-10">
        <h6 className="box-text-nobold">
          {props.author.name + ", " + props.author.role + " @ " + props.author.company}
        </h6>
      </div>
    </Link>
  )
}

const PostBookmark = (props) => {
  if (props.editorReadOnly === false) return null
  return (
    <button
      type="button"
      className={`${props.userBookmarked && "box-button-line-graySelected"} box-flex-col box-flex-acenter box-flex-jcenter card-upvoteButton box-button-line-gray`}>
      <FiBookmark className="box-text-7" />
      <h6 className="box-text-7">{props.bookmarkedCount}</h6>
    </button>
  )
}

const PostTags = (props) => {
  if (props.type !== "challenge") return null
  return (
    <div className="box-margin-bottom-10">
      {
        !props.editorReadOnly &&
        <div className="box-margin-bottom-20">
          <Tags tags={props.tags} changeVal={props.changeVal} allowNew={true} />
        </div>
      }
      {
        props.editorReadOnly && props.tags.length > 0 &&
        <div className="box-flex-row box-flex-wrap box-margin-bottom-20">
          {
            props.tags.map((tag, index) => {
              return <div key={index} className="box-tags box-color-gray box-text-7">{tag.name}</div>
            })
          }
        </div>
      }
      {
        props.editorReadOnly && props.tags.length === 0 &&
        <h6 className="box-margin-bottom-20 box-color-gray">No Communities</h6>
      }
    </div>
  )
}

const PostDetailsReadOnly = (props) => {
  let startDateString = null
  if (props.startDate) {
    startDateString = props.startDate.toLocaleString('default', { month: 'long' }) + " " +
      props.startDate.getDate() + ", " + props.startDate.getFullYear()
  }
  let endDateString = null
  if (props.endDate) {
    endDateString = props.endDate.toLocaleString('default', { month: 'long' }) + " " +
      props.endDate.getDate() + ", " + props.endDate.getFullYear()
  }
  let fullDate = props.startDate ? startDateString + " to " + endDateString : ""

  let budgetString = props.budget ? "$" + parseInt(props.budget).toLocaleString() : "$0"

  return (
    <div className="box-position-relative box-flex-row box-flex-wrap box-margin-bottom-60">
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Status
        </h6>
        <div className="c-titleHeight box-flex-row box-flex-acenter"><Pill status={props.status} /></div>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Type
        </h6>
        <h5 className="box-text-nobold c-titleHeight box-flex-row box-flex-acenter">{props.type}</h5>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Budget
        </h6>
        <h5 className="box-text-nobold c-titleHeight box-flex-row box-flex-acenter">{budgetString}</h5>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Start & End Dates
        </h6>
        <h5 className="box-text-nobold c-titleHeight box-flex-row box-flex-acenter">{fullDate}</h5>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Company Size
        </h6>
        <h5 className="box-text-nobold c-titleHeight box-flex-row box-flex-acenter">{props.author.companySize}</h5>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Industry
        </h6>
        <h5 className="box-text-nobold c-titleHeight box-flex-row box-flex-acenter">
          {props.author.industryCategory + ", " + props.author.industryName}
        </h5>
      </div>
      <div className="box-margin-right-40 box-margin-top-20">
        <h6 className="box-text-bold box-color-gray box-text-7">
          Company Website
        </h6>
        <a className="box-text-5 c-titleHeight box-flex-row box-flex-acenter box-color-gray"
          href={props.author.companyWebsite}
          target="_blank"
          rel="noopener noreferrer">
          {props.author.companyWebsite}
        </a>
      </div>
    </div>
  )
}

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

const PostComment = (props) => {
  let author = null
  let liked = props.data && props.data.userLiked ? props.data.userLiked : false
  let likes = props.data && props.data.likes ? props.data.likes : 0
  let body = props.data && props.data.body ? props.data.body : "Hello"
  if(!props.data || !props.data.author) {
    author = {
      name: "Firstname Lastname",
      role: "Role",
      company: "Company",
      username: "username"
    }
  } else author = props.data.author
  let headline = author.name + ", " + author.role + " @ " + author.company
  let likeString = likes !== 1 ? "Likes" : "Like"

  return (
    <div className="box-position-relative box-margin-top-40 box-margin-bottom-40">
      <Link to={`/m/${author.username}`}
        className="box-flex-row box-flex-acenter box-color-black box-margin-bottom-20">
        <div className="box-img-circleWrapper box-profileImage-s box-margin-right-10 box-border-light">
          <img src={props.data && props.data.image ? props.data.image : Icon}
            className="box-img-circle" alt="Member" draggable="false" />
        </div>
        <h6 className="box-text-nobold">{headline}</h6>
      </Link>

      <p className="box-margin-bottom-20 box-lineheight-0">{body}</p>

      <div className="box-flex-row box-flex-end box-flex-acenter">
        <button className={`${liked && "box-button-line-graySelected"} box-button-line-gray box-text-bold box-flex-row-center box-text-8`}>
          <span className="box-margin-right-5">{likes}</span>
          {likeString}
        </button>
      </div>
    </div>
  )
}

const PostCommentList = (props) => {
  return (
    <div className="box-position-relative">
      <PostComment />
      {props.comments.map(comment => {
        return <PostComment data={comment} />
      })}
    </div>
  )
}

let PostBody = {
  "ops": [
    {
      "insert": "Background"
    },
    {
      "attributes": {
        "header": 1
      },
      "insert": "\n"
    },
    {
      "insert": "Write a short description about your company and industry. If you have market research or statistics about your company, industry, or competitors, include them here.\n\n\nThe Challenge"
    },
    {
      "attributes": {
        "header": 1
      },
      "insert": "\n"
    },
    {
      "insert": "Describe the challenge that your company faces. Include details about why this challenge is important and the future opportunities that your company will be able to attain upon completion.\n\n\nObjectives & Deliverables"
    },
    {
      "attributes": {
        "header": 1
      },
      "insert": "\n"
    },
    {
      "insert": "List the target objectives and deliverables of the challenge. Feel free to be broad or extremely specific about the challenge scope depending on your needs.\n\n\nSelection"
    },
    {
      "attributes": {
        "header": 1
      },
      "insert": "\n"
    },
    {
      "insert": "Identify the criteria that will be used to evaluate submitted proposals. Include skill sets, required experience, solution methodologies & frameworks, and more.\n\n\nWorkflow & Links"
    },
    {
      "attributes": {
        "header": 1
      },
      "insert": "\n"
    },
    {
      "insert": "Specify the workflow of the challenge after the challenge is closed and proposals are selected. Include project management links, storage links, messaging & collaboration links, and others.\n"
    }
  ]
}
let PostBodyPlaceholder = JSON.stringify(PostBody)

export {
  PostImage,
  PostTitle,
  PostHeading,
  PostCompany,
  PostAuthor,
  PostBookmark,
  PostTags,
  PostDetailsReadOnly,
  PostCommentButtons,
  PostCommentEditor,
  PostBodyPlaceholder,
  PostCommentList
}