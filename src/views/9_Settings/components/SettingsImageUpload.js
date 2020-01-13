import React from 'react'
import { uploadFile, removeFile } from '../../../services/authApi'
import Loading from '../../0_Components/4_Loading/Loading'
import Icon from '../../../img/stratagan-icon.png'
import Image from '../../../img/stratagan.png'
import { putUser } from '../../../services/api'

class SettingsImageUpload extends React.Component {
  state = {
    error: "",
    loading: false
  }

  onChangeInput = async (e) => {
    const file = e.target.files[0]
    const eID = e.target.id
    try {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        this.setState({ ...this.state, error: "File type must be PNG or JPEG.", loading: false })
        return
      }
      this.setState({ ...this.state, loading: true })

      if (eID === "userImageUpload" && this.props.user.image) {
        await removeFile(this.props.user.image)
      } else if (eID === "companyImageUpload" && this.props.user.companyImage) {
        await removeFile(this.props.user.companyImage)
      }

      let response = await uploadFile(file)
      if (response.error) {
        this.setState({ ...this.state, error: response.error, loading: false })
        return
      }

      let data = null
      if (eID === "userImageUpload") {
        data = { user: { image: response } }
      } else if (eID === "companyImageUpload") {
        data = { user: { companyImage: response } }
      }

      response = await putUser(data)
      this.props.changeUser(response.user)
      this.setState({ ...this.state, loading: false, error: "" })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="box-margin-bottom-40">
        <form className="page-padding">
          <h4 className="box-text-bold box-margin-bottom-20">Images</h4>

          <div className="box-flex-row box-flex-wrap">
            <div className="box-flex-row box-margin-bottom-20">
              {
                this.props.user &&
                <div className="box-img-circleWrapper box-profileImage-sl box-border">
                  <img src={this.props.user.image ? this.props.user.image : Icon}
                    className="box-img-circle"
                    alt="Account"
                    draggable="false" />
                </div>
              }

              <div className="box-flex-row">
                <div className="box-margin-left-20 box-margin-right-20">
                  <label htmlFor="userImageUpload"
                    className="box-button-line-gray box-text-7 box-color-mediumgray box-text-bold box-background box-display-block">
                    Profile Image
                </label>
                </div>

                <input
                  id="userImageUpload"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="box-display-none box-margin-top-10"
                  onChange={this.onChangeInput} />

              </div>
            </div>

            <div className="box-flex-row box-margin-bottom-20">
              {
                this.props.user &&
                <div className="box-img-rectangleWrapper box-companyImage-sl box-container">
                  <img src={this.props.user.companyImage ? this.props.user.companyImage : Image}
                    className="box-img-rectangle"
                    alt="Account"
                    draggable="false" />
                </div>
              }

              <div className="box-flex-row">
                <div className="box-margin-left-20 box-margin-right-20">
                  <label htmlFor="companyImageUpload"
                    className="box-button-line-gray box-text-7 box-color-mediumgray box-text-bold box-background box-display-block">
                    Company Image
                </label>
                </div>

                <input
                  id="companyImageUpload"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="box-display-none box-margin-top-10"
                  onChange={this.onChangeInput} />

              </div>
            </div>
          </div>
          {
            this.state.error !== "" && !this.state.loading &&
            <div><h6 className="box-text-8 box-color-red box-text-nobold settings-warningHeight box-flex-row box-flex-acenter">
              {this.state.error}
            </h6></div>
          }
          {
            this.state.loading &&
            <div className="box-flex-row">
              <div><Loading small={true} /></div>
            </div>
          }
        </form>
      </div>
    )
  }
}

export default SettingsImageUpload