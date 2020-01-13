import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './reducers/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './views/App'
import './index.css'

import Amplify from 'aws-amplify'
import AuthStore from './services/authStore'
import * as serviceWorker from './serviceWorker'

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_c_REGION,
    userPoolId: process.env.REACT_APP_c_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_c_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_c_APP_CLIENT_ID,
    storage: AuthStore
  },
  Storage: {
    region: process.env.REACT_APP_s3_REGION,
    bucket: process.env.REACT_APP_s3_BUCKET,
    identityPoolId: process.env.REACT_APP_c_IDENTITY_POOL_ID
  }
})

export const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
