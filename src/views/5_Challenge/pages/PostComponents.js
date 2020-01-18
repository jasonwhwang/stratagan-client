import React from 'react'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea'
import Tags from '../../0_Components/8_Tags/Tags'
import Icon from '../../../img/stratagan-icon.png'
import PlaceImage from '../../../img/placeholder.svg'
import Image from '../../../img/stratagan.png'
import Pill from '../../0_Components/5_Cards/5_Pill'
import { FiBookmark } from "react-icons/fi"

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
  PostBodyPlaceholder
}