import React from 'react'
import Loading from '../4_Loading/Loading'
import { FiTrash2 } from "react-icons/fi"

class EditorButtons extends React.Component {
  toggleEditor = () => {
    this.props.changeVal("editorReadOnly", !this.props.editorReadOnly)
  }

  render() {
    let textDate = null
    if(this.props.updatedAt) {
      let date = new Date(this.props.updatedAt)
      let month = date.toLocaleString('default', { month: 'long' })
      let day = date.getDate()
      let year = date.getFullYear()
      textDate = `${month} ${day}, ${year}`
    }

    return (
      <div className="box-flex-row box-margin-top-20">
        {
          this.props.updatedAt &&
          <h6 className="box-text-bold box-text-7 box-color-gray">
            <span className="box-margin-right-10">Updated</span>
            {textDate}
          </h6>
        }
        {
          !this.props.error && !this.props.success && !this.props.loading &&
          <div className="box-spacer"></div>
        }
        {
          this.props.error && !this.props.loading &&
          <h6 className="box-spacer box-flex-end box-margin-right-20 box-text-8 box-color-red box-text-nobold settings-warningHeight box-flex-row box-flex-acenter">
            {this.props.error}
          </h6>
        }
        {
          this.props.success && !this.props.loading &&
          <h6 className="box-spacer box-flex-end box-margin-right-20 box-text-8 box-text-nobold settings-warningHeight box-flex-row box-flex-acenter">
            {this.props.success}
          </h6>
        }
        {
          this.props.loading &&
          <div className="box-spacer box-flex-end box-flex-row box-margin-right-20">
            <div><Loading small={true} /></div>
          </div>
        }
        {
          !this.props.editorReadOnly && !this.props.loading && this.props.delete && this.props.updatedAt &&
          <button onClick={this.props.delete}
            className="box-margin-right-20 box-margin-top-3">
            <FiTrash2 />
          </button>
        }
        {
          !this.props.editorReadOnly && !this.props.loading &&
          <div className="box-flex-row-center box-margin-right-20">
            <button
              type="button"
              onClick={this.toggleEditor}
              className="">
              Close
            </button>
          </div>
        }
        {
          !this.props.disabled &&
          <div>
            <button
              onClick={this.props.editorReadOnly ? this.toggleEditor : this.props.submit}
              type={this.props.editorReadOnly ? "button" : "submit"}
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              {this.props.editorReadOnly ? "Edit" : "Save"}
            </button>
          </div>
        }
      </div>
    )
  }
}

export default EditorButtons