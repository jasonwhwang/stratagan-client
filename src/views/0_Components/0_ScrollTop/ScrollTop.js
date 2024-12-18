import React from 'react'

class ScrollTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname
      || this.props.location.search !== prevProps.location.search) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollTop