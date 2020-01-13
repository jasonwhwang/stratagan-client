import React from 'react'
import Editor from '../../0_Components/9_Editor/Editor'
import EditorButtons from '../../0_Components/9_Editor/EditorButtons'
import { putUser } from '../../../services/api'

class NetworkAbout extends React.Component {
  constructor(props) {
    super(props)
    this.editor = React.createRef()
  }

  state = {
    editorReadOnly: true,
    about: null,
    error: "",
    loading: "",
    success: ""
  }

  submitEditor = async () => {
    let delta = this.editor.current.quill.getEditor().getContents()

    this.setState({ ...this.state, loading: true })
    let res = await putUser({ user: { about: JSON.stringify(delta) } })
    if (res.error) {
      this.setState({
        ...this.state,
        error: res.error,
        success: "",
        loading: false
      })
      return false
    } else {
      this.setState({
        ...this.state,
        about: res.user.about,
        error: "",
        success: "Successfully updated about.",
        loading: false
      })
      return true
    }
  }

  changeVal = (type, val) => {
    this.setState({ ...this.state, [type]: val })
  }

  toggleEditor = () => {
    this.setState({ ...this.state, editorReadOnly: !this.state.editorReadOnly })
  }

  render() {
    return (
      <div className="box-position-relative page-padding box-flex-col box-spacer">
        <div className="box-margin-bottom-60 box-position-relative">
          <Editor
            text={this.props.user.about}
            editorReadOnly={this.state.editorReadOnly}
            changeVal={this.changeVal}
            submitEditor={this.submitEditor}
            ref={this.editor}
            editorPlaceholder={"Your about section is empty. Write a short description about who you are and what you do."}
          />

          <EditorButtons
            disabled={!this.props.authUser || this.props.authUser.username !== this.props.user.username}
            editorReadOnly={this.state.editorReadOnly}
            toggleEditor={this.toggleEditor}
            submit={this.submitEditor}
            error={this.state.error}
            loading={this.state.loading}
            success={this.state.success}
          />
        </div>

        <div className="box-spacer"></div>

        <div className="box-flex-row box-flex-row-acenter box-flex-wrap">
          {this.props.user.company && this.props.user.companyImage &&
            <div className="box-flex-row box-margin-top-30 box-margin-right-60">
              <div className="box-img-rectangleWrapper box-companyImage-l">
                <img className="box-img-rectangle"
                  alt={this.props.user.company}
                  src={this.props.user.companyImage} />
              </div>
              {this.props.user.companyWebsite ?
                <a href={this.props.user.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="box-text-5 box-margin-left-20 box-color-black box-text-extraBold">
                  {this.props.user.company}
                </a>
                :
                <h5 className="box-margin-left-20">{this.props.user.company}</h5>
              }
            </div>
          }
          {this.props.user.industryCategory && this.props.user.industryName &&
            <div className="box-margin-top-30 box-margin-right-20">
              <h6>Industry</h6>
              <h6 className="box-text-nobold">{this.props.user.industryCategory + ", " + this.props.user.industryName}</h6>
            </div>
          }
          {this.props.user.address &&
            <div className="box-margin-top-30">
              <h6>Location</h6>
              <h6 className="box-text-nobold">{this.props.user.address}</h6>
            </div>
          }
        </div>

        {
          // this.props.user.tags && this.props.user.tags.length > 0 &&
          // <div>
          //   <h6 className="box-margin-bottom-10">Communities</h6>
          //   <div className="box-flex-row box-flex-wrap">
          //     {
          //       this.props.user.tags.map(tag => {
          //         return <div key={tag._id} className="box-tags box-color-gray box-text-7">{tag.name}</div>
          //       })
          //     }
          //   </div>
          // </div>
        }
      </div>
    )
  }
}


export default NetworkAbout