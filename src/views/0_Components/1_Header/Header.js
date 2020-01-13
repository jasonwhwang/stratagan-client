import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.css'
import Icon from '../../../img/stratagan-icon.png'
import Logo from '../../../img/stratagan.svg'
import { refresh } from '../../../services/authApi'
import { FiSearch, FiMail } from "react-icons/fi"

const mapStateToProps = state => ({
  user: state.common.user
})

class Header extends React.Component {
  async componentDidMount() {
    refresh()
  }
  render() {
    return (
      <div className="header" id="header">
        <div className="header-wrapper box-flex-between" id="header-wrapper">
          <Link className="header-title box-text-3 box-text-style1" to="/">
            <div className="box-img-rectangleWrapper header-logo">
              <img src={Logo} className="box-img-rectangle" alt="Stratagan" draggable="false" />
            </div>
          </Link>



          <div className="box-flex-row">
            <Link className={`header-button box-flex-row-center box-text-5
              ${this.props.location.pathname.indexOf("/s/") === 0 ? "header-buttonSelected" : null}`}
              to="/s/all">
              <FiSearch />
            </Link>

            {
              this.props.user &&
              <Link className={`header-button box-flex-row-center box-text-5
                ${this.props.location.pathname.indexOf("/notifications") === 0
                  || this.props.location.pathname.indexOf("/requests") === 0
                  ? "header-buttonSelected" : null}`}
                to="/notifications">
                <FiMail />
              </Link>
            }

            <Link className={`header-button box-flex-row-center ${this.props.user && "header-buttonImage "}
              ${this.props.user && this.props.location.pathname.indexOf(`/m/${this.props.user.username}`) === 0 ? "header-buttonSelected" : null}`}
              to={this.props.user ? `/m/${this.props.user.username}` : '/login'} >
              {
                !this.props.user && <h6 className="box-text-bold box-text-7">Log in</h6>
              }
              {
                this.props.user &&
                <div className="box-img-circleWrapper box-profileImage-s box-shadow-lite">
                  <img src={this.props.user.image ? this.props.user.image : Icon}
                    className="box-img-circle"
                    alt="Account"
                    draggable="false" />
                </div>
              }
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header)