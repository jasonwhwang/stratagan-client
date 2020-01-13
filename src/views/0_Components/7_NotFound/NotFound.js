import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { CSSTransition } from 'react-transition-group'

class NotFound extends React.Component {
  state = {
    show: false,
    tab: 0
  }

  componentDidMount() {
    this.setState({ ...this.state, show: true })
  }

  changeVal = (val) => {
    this.setState({ ...this.state, tab: val })
  }

  render() {
    return (
      <div className="page">
        <CSSTransition in={this.state.show} appear={true} timeout={250} classNames="fade" unmountOnExit>
          <div className="page-wrapper box-position-relative">
            <HelmetProvider><Helmet>
              <title>Not Found</title>
              <meta name="description" content="Not Found" />
            </Helmet></HelmetProvider>

            <div className="page-main box-flex-row-center">
              <div className="box-margin-bottom-60">
                <h1 className="box-flex-row-center box-margin-bottom-20">404</h1>
                <h3 className="box-flex-row-center box-text-nobold">
                  Not Found
                </h3>
              </div>
            </div>

          </div>
        </CSSTransition>
      </div>
    )
  }
}




export default NotFound