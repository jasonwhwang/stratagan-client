import React from 'react'
import { Link } from 'react-router-dom'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { signUp } from '../../../services/authApi'
import '../Login.css'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'

class Signup extends React.Component {
  state = {
    "email": "",
    "password": "",
    error: "",
    loading: false
  }

  changeInputState = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  submitForm = async (e) => {
    e.preventDefault()
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ ...this.state, error: "Missing required fields." })
      return
    }

    this.setState({ ...this.state, loading: true })
    let response = await signUp(this.state.email, this.state.password)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
    } else {
      this.props.history.push("/welcome")
    }
  }

  render() {
    if (this.state.loading) return <LoadingPage medium={true} />

    let title = "Sign Up"
    return (
      <FadeTransition>
        <div className="page-wrapper">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
          </Helmet></HelmetProvider>

          <div className="login box-flex-row box-flex-acenter">
            <form onSubmit={this.submitForm} className="login-marginBottom100">
              <h1 className="box-margin-bottom-30">{title}</h1>

              {
                this.state.error !== "" &&
                <h6 className="box-text-8 box-color-red box-text-nobold">{this.state.error}</h6>
              }

              <input value={this.state.email}
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="username"
                className="box-input box-text-5 box-margin-top-10 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <input value={this.state.password}
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                className="box-input box-text-5 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <h6 className="box-text-nobold box-text-8">
                By signing up, you agree to our <Link to="/legal" className="box-text-8 box-color-black box-text-underline">terms</Link> & <Link to="/legal/privacy" className="box-text-8 box-color-black box-text-underline">privacy</Link>.
              </h6>

              <div className="box-flex-row box-flex-acenter box-margin-top-20">
                <button className="box-button">{title}</button>
                <div className="box-spacer"></div>
                <Link to="/login">Have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </FadeTransition>
    )
  }
}

export default Signup