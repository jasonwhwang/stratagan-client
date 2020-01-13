import React from 'react'
import Loading from './Loading'
import FadeTransition from '../10_FadeTransition/FadeTransition'

const LoadingPage = (props) => {
  if (props.small === true) {
    return (
      <FadeTransition>
        <div className="box-spacer box-flex-row-center">
          {!props.error && <div className="box-margin-bottom-40"><Loading /></div>}
          {props.error && <h3>{props.error}</h3>}
        </div>
      </FadeTransition>
    )
  }

  if (props.medium === true) {
    return (
      <FadeTransition>
        <div className="page-wrapper box-position-relative">
          <div className="page-main box-flex-row-center">
            {!props.error && <div className="box-margin-bottom-40"><Loading /></div>}
            {props.error && <h3>{props.error}</h3>}
          </div>
        </div>
      </FadeTransition>
    )
  }

  return (
    <div className="page">
      <FadeTransition>
        <div className="page-wrapper box-position-relative">
          <div className="page-main box-flex-row-center">
            {!props.error && <div className="box-margin-bottom-40"><Loading /></div>}
            {props.error && <h3>{props.error}</h3>}
          </div>
        </div>
      </FadeTransition>
    </div>
  )
}

export default LoadingPage