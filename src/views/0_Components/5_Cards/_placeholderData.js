export const challengePD = {
  image: null,
  url: "/01234-challenge-title",
  title: "Challenge Title",
  heading: "Description of the challenge that includes basic details and information.",
  author: {
    company: "Company Name",
    companyImage: null,
    companyUsername: "companyusername"
  },
  status: "draft",
  bookmarked: false
}

// Slugify url
export const advicePD = {
  questionData: {
    url: "/12345-question-about-business-goes-here",
    question: "Question about business goes here. It can be about anything that the business requires feedback on.",
    details: "Details about the question go here. They provide additional context for the particular business problem.",
    author: {
      name: "Company Name",
      role: null,
      company: null,
      image: null,
      username: "companyusername"
    },
    bookmarks: 35,
    answers: 1
  },
  answerData: {
    answer: "Here is the placeholder for the answer. In the future, this will hold the QuillJS delta instead of a literal string. Here is some additional filler text in order to test the limit affect of the div container. Text will be cropped off once reaching the limit of the div height. Text will be cropped off once reaching the limit of the div height. Text will be cropped off once reaching the limit of the div height. Text will be cropped off once reaching the limit of the div height.",
    author: {
      name: "Firstname Lastname",
      role: "Role",
      company: "Company",
      image: null,
      username: "username",
      isFollowing: false
    },
    upvotes: 5
  },
  userData: {
    questionUpvoted: false,
    answerUpvoted: false
  }
}

export const networkPD = {
  image: null,
  url: "/m/user",
  name: "Firstname Lastname",
  role: "Role",
  company: "Company",
  username: "username",
  isFollowing: false,
  challengeNumber: 3,
  adviceNumber: 5,
  upvoteNumber: 7,
  description: "Description about the user goes here and will explain the member's expertise. This description can be anything that the user wants to write about, but the preview will be limited."
}

export const notificationPD = {
  url: "/url",
  date: "10 min ago",
  type: "challenge",
  typeDescription: "New challenge submission",
  image: null,
  name: "Firstname Lastname",
  title: "Challenge Title",
  description: "Description of the challenge that includes basic details and information.",
  seen: false
}

export const requestPD = {
  url: "/url",
  date: "10 min ago",
  author: {
    image: null,
    name: "Firstname Lastname",
    description: "Role @ Company"
  },
  type: "challenge",
  typeDescription: "New challenge submission",
  image: null,
  title: "Challenge Title",
  description: "Description of the challenge that includes basic details and information.",
  seen: false
}