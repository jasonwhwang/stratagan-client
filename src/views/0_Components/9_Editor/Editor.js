import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor.css'
import { uploadFile, removeFile } from '../../../services/authApi'

var sticky = 0

class Editor extends React.Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.setStickyToolbar()
    this.quill.getEditor().on("text-change", this.imageDeleteHandler)
    if (this.props.text) this.setState({ text: JSON.parse(this.props.text) })
    this.setToolbar(this.props.editorReadOnly)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate(prevProps) {
    if(this.props.editorReadOnly !== prevProps.editorReadOnly) {
      this.setToolbar(this.props.editorReadOnly)
    }
  }

  // STICKY TOOLBAR FUNCTIONS
  setStickyToolbar = () => {
    if (window.innerWidth > 800) {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    } else {
      document.body.addEventListener('touchmove', this.handleScroll, { passive: true })
    }
    let headerElement = document.getElementsByClassName("ql-toolbar")[0]
    sticky = headerElement.getBoundingClientRect().top
  }
  handleScroll = (event) => {
    let header = document.getElementsByClassName("ql-toolbar")[0]
    let container = document.getElementsByClassName("ql-container")[0]
    // let dRight = document.getElementById("d-right")
    let width = container.offsetWidth
    let bias = window.innerWidth > 800 ? 0 : 50
    let marker = window.pageYOffset
    // let marker = window.innerWidth > 800 ? window.pageYOffset : dRight.scrollTop
    
    // dRight.scrollTop by overflow of div

    if (marker + bias > sticky && !this.props.editorReadOnly) {
      window.innerWidth > 800 ? header.classList.add("stickyToolbar") : header.classList.add("stickyToolbar50")
      header.style.width = width + "px"
      window.innerWidth > 800 ? container.classList.add("stickyPadding") : container.classList.add("stickyPadding67")
    } else {
      window.innerWidth > 800 ? header.classList.remove("stickyToolbar") : header.classList.remove("stickyToolbar50")
      header.style.width = "100%"
      window.innerWidth > 800 ? container.classList.remove("stickyPadding") : container.classList.remove("stickyPadding67")
    }
  }
  setToolbar = (val) => {
    if (val) {
      document.getElementsByClassName("ql-toolbar")[0].classList.add("ql-hideToolbar")
      document.getElementsByClassName("ql-container")[0].classList.add("ql-hideContainer")
      document.getElementsByClassName("ql-editor")[0].classList.add("ql-removePadding")
    } else {
      document.getElementsByClassName("ql-toolbar")[0].classList.remove("ql-hideToolbar")
      document.getElementsByClassName("ql-container")[0].classList.remove("ql-hideContainer")
      document.getElementsByClassName("ql-editor")[0].classList.remove("ql-removePadding")
    }
  }

  // EDITOR FUNCTIONS
  handleChange = (value) => {
    this.setState({ text: value })
  }

  imageLinkHandler = () => {
    var range = this.quill.getEditor().getSelection()
    var value = prompt('What is the image URL')
    if (value) {
      this.quill.getEditor().insertEmbed(range.index, 'image', value, "user")
    }
  }

  imageUploadHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async function () {
      this.props.changeVal("loading", true)
      const file = input.files[0]
      console.log(file)
      console.log("Start Image Upload")
      const response = await uploadFile(file)
      if (response.error) {
        this.props.changeVal("error", response.error)
        this.props.changeVal("loading", false)
        return
      }
      let editor = this.quill.getEditor()
      const range = editor.getSelection()
      editor.insertEmbed(range.index, 'image', response, "user")
      let submitSuccess = this.props.submitEditor()
      if(submitSuccess === false) await removeFile(response)
    }.bind(this)
  }

  imageDeleteHandler = (delta, oldContents, source) => {
    if (source !== 'user') return
    // const inserted = this.getImgUrls(delta);
    // inserted.length && console.log('insert', inserted)
    const deleted = this.getImgUrls(this.quill.getEditor().getContents().diff(oldContents))
    deleted.length && this.deleteImages(deleted)
  }
  getImgUrls = (delta) => {
    return delta.ops.filter(i => i.insert && i.insert.image).map(i => i.insert.image)
  }
  deleteImages = async (imgArr) => {
    console.log(imgArr)
    await Promise.all(imgArr.map(async img => {
      let deleteRes = await removeFile(img)
      console.log(deleteRes)
      return
    }))
    this.props.submitEditor()
  }

  modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'blockquote', 'image'],
      ],
      handlers: {
        'image': this.imageUploadHandler
      }
    }
  }

  formats = [
    'header',
    'bold', 'italic', 'underline',
    'align', 'list', 'bullet', 'indent',
    'link', 'blockquote', 'image'
  ]

  render() {
    return (
      <div className="box-position-relative">
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
          readOnly={this.props.editorReadOnly}
          modules={this.modules}
          formats={this.formats}
          placeholder={this.props.editorPlaceholder}
          ref={(el) => this.quill = el} />
      </div>
    )
  }
}

export default Editor