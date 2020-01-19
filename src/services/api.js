import axios from 'axios'
import { refresh } from './authApi'
import AuthStore from "./authStore"

// Axios Github Documentation:
// https://github.com/axios/axios#example
// axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.baseURL = 'https://stratagan.herokuapp.com/api'
axios.defaults.headers.post['X-Requested-With'] = 'XML-HTTPRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Login
async function getWelcome() {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: ('/private'),
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getLogIn() {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: ('/login'),
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getUser() {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: ('/user'),
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function putUser(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'put',
      url: ('/user'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}`}
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

// Tags
async function getTags() {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: ('/tags')
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getTagsMain() {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: ('/tags/main')
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getTagsMember(member) {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: (`/tags/member/${member}`)
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function postTag(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'post',
      url: ('/tags/new'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}


// Member
async function getMember(member) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      url: (`/member/${member}`),
      headers: headers
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getMembers(data) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      url: ('/members'),
      params: data,
      headers: headers,
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

// Member
async function getMembersCount(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'get',
      url: (`/members/count`),
      params: data
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}


// Challenges
async function postChallenge(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'post',
      url: ('/challenge'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getChallengeMember(username) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      url: (`/challenge/member/${username}`),
      headers: headers,
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getChallenge(challengeSub) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      url: (`/challenge/info/${challengeSub}`),
      headers: headers,
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function getChallengeAll(data) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      params: data,
      url: ('/challenge/all'),
      headers: headers,
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function deleteChallenge(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'delete',
      url: ('/challenge'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

// Comments
async function getCommentsChallenge(challenge) {
  await refresh()
  let token = AuthStore.getIdToken()
  let headers = {}
  if(token) headers["Authorization"] = `Bearer ${token}`

  try {
    let res = await axios({
      method: 'get',
      url: (`/comment/challenge/${challenge}`),
      headers: headers,
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function postComment(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'post',
      url: ('/comment'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

async function deleteComment(data) {
  await refresh()
  try {
    let res = await axios({
      method: 'delete',
      url: ('/comment'),
      data: data,
      headers: { "Authorization": `Bearer ${AuthStore.getIdToken()}` }
    })

    return res.data
  } catch (err) {
    return err && err.response ? { error: err.response.data } : { error: err}
  }
}

export {
  getWelcome, getLogIn, getUser, putUser,
  getTags, getTagsMain, getTagsMember, postTag,
  getMember, getMembers, getMembersCount,
  postChallenge, getChallengeMember, getChallenge, getChallengeAll, deleteChallenge,
  getCommentsChallenge, postComment, deleteComment
}