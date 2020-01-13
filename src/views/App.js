import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ScrollTop from './0_Components/0_ScrollTop/ScrollTop'
import Header from './0_Components/1_Header/Header'
import Footer from './0_Components/2_Footer/Footer'
import Home from './1_Home/Home'
import Login from './2_Login/Login'
import Explore from './3_Explore/Explore'
import Search from './4_Search/Search'
import Challenge from './5_Challenge/Challenge'
import Network from './6_Network/Network'
import About from './7_About/About'
import Messages from './8_Messages/Messages'
import Settings from './9_Settings/Settings'
import NotFound from './0_Components/7_NotFound/NotFound'

class App extends React.Component {
  render() {
    return (
      <div className="app" id="app">
        <Header history={this.props.history} location={this.props.location}/>
        <ScrollTop location={this.props.location}>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/notifications" component={Messages} />
            <Route path="/requests/:route?" component={Messages} />

            <Route path="/settings" component={Settings} />
            <Route path="/payments" component={Settings} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Login} />
            <Route path="/resetpassword" component={Login} />
            <Route path="/newpassword" component={Login} />
            <Route path="/welcome" component={Login} />
            <Route path="/success" component={Login} />

            <Route path="/s/:route?" component={Explore} />
            <Route path="/search" component={Search} />
            <Route path="/communities" component={Search} />
            <Route path="/joined" component={Search} />
            <Route path="/advanced" component={Search} />

            <Route path="/c/:challenge?/:route?" component={Challenge} />

            <Route path="/m/:username/:subpage?" component={Network} />

            <Route path="/about/:route?" component={About} />
            <Route path="/careers" component={About} />
            <Route path="/legal/:route?" component={About} />

            <Route component={NotFound} />
          </Switch>
        </ScrollTop>
        <Footer />
      </div>
    );
  }
}

export default App