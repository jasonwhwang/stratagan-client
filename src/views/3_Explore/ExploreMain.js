import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import ExploreChallenges from './1_Pages/ExploreChallenges'
import ExploreNetwork from './1_Pages/ExploreNetwork'
import ExploreProposals from './1_Pages/ExploreProposals'
import { FiPlus } from "react-icons/fi"
import FadeTransition from '../0_Components/10_FadeTransition/FadeTransition'
import { getChallengeAll, getMembers } from '../../services/api'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'



const mapStateToProps = state => ({
  user: state.common.user,
  search: state.search
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class ExploreMain extends React.Component {
  state = {
    showDropdown: false,
    options: ["Challenges", "Proposals", "Members"],
    loading: true,
    list: []
  }
  toggleDropdown = () => {
    this.setState({ ...this.state, showDropdown: !this.state.showDropdown })
  }
  changeDropdown = async (val) => {
    this.setState({ ...this.state, loading: true, list: [], showDropdown: false })
    this.props.changeVal("searchType", val)
  }
  changeSearch = (e) => {
    this.props.changeVal(e.target.id, e.target.value)
  }

  searchQuery = async () => {
    this.setState({ ...this.state, loading: true })
    let query = {}
    if(this.props.community !== "All Communities") query.community = this.props.community
    if(this.props.search.typeChallenge !== "All") query.type = this.props.search.typeChallenge
    query.sort = this.props.search.sort
    if(this.props.search.statusChallenge !== "All") query.status = this.props.search.statusChallenge
    if(this.props.search.industry !== "All") query.industryCategory = this.props.search.industry
    if(this.props.search.companySize !== "All") query.companySize = this.props.search.companySize
    query.budgetLow = this.props.search.budgetC[0]
    if(this.props.search.budgetC[1] < 50000) query.budgetHigh = this.props.search.budgetC[1]
    if(this.props.search.searchKeywords) query.keywords = this.props.search.searchKeywords

    let listRes = { list: [] }
    if(this.props.search.searchType === "Challenges") listRes = await getChallengeAll(query)
    else if(this.props.search.searchType === "Members") listRes = await getMembers(query)
    this.setState({ ...this.state, loading: false, list: listRes.list })
  }

  componentDidMount() {
    this.searchQuery()
  }
  componentDidUpdate(prevProps) {
    if(prevProps.search.searchType !== this.props.search.searchType) this.searchQuery()
    if(prevProps.location.pathname !== this.props.location.pathname) this.searchQuery()
  }

  submitSearch = (e) => {
    e.preventDefault()
    this.searchQuery()
  }

  render() {
    return (
      <div className="box-spacer box-container box-shadow-lite box-flex-col">
        <div className="box-flex-row explore-searchPadding box-border-bottom">
          <ExploreDropdown
            showDropdown={this.state.showDropdown}
            toggleDropdown={this.toggleDropdown}
            dropdownVal={this.props.search.searchType}
            changeDropdown={this.changeDropdown}
            options={this.state.options} />

          <form onSubmit={this.submitSearch}
            className="box-spacer box-margin-left-10">
            <input className="box-input"
            id="searchKeywords"
            placeholder="Search..."
            value={this.props.search.searchKeywords}
            onChange={this.changeSearch} />
          </form>

          {this.props.user && this.props.search.searchType === "Challenges" &&
            <FadeTransition>
              <Link to="/c/new"
                className="box-button box-flex-row-center box-text-5 box-margin-left-10">
                <FiPlus />
              </Link>
            </FadeTransition>
          }
        </div>

        <ErrorBoundary>
          <div className="box-spacer box-flex-col">
            {this.state.loading &&  
              <LoadingPage small={true} />}
            {this.props.search.searchType === "Challenges" && !this.state.loading &&
              <ExploreChallenges list={this.state.list} />}
            {this.props.search.searchType === "Proposals" && !this.state.loading &&
              <ExploreProposals list={this.state.list} />}
            {this.props.search.searchType === "Members" && !this.state.loading &&
              <ExploreNetwork list={this.state.list} />}
          </div>
        </ErrorBoundary>
      </div>
    )
  }
}

const ExploreDropdown = (props) => {
  return (
    <div className="box-position-relative">
      <button onClick={props.toggleDropdown} type="button"
        className="explore-button-minWidth box-expand-height box-button-line-gray box-text-bold box-flex-row-center box-color-mediumgray">
        <span>{props.dropdownVal}</span>
      </button>
      <div className={`explore-dropdown box-flex-col box-text-8 ${props.showDropdown ? "box-show" : "box-hidden"}`}>
        {
          props.options.map((buttonOption, index) => {
            return (
              <button key={index} type="button"
                className={`explore-dropdownButton ${index !== props.options.length - 1 && "box-border-bottom"}`}
                onClick={() => props.changeDropdown(buttonOption)}>{buttonOption}</button>
            )
          })
        }
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMain)