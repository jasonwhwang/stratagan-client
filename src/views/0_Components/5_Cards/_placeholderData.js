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