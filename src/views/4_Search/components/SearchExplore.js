import React from 'react'
import { connect } from 'react-redux'
import 'rc-slider/assets/index.css'
import ExploreOption from './1_ExploreOption'
import ExploreBudget from './2_ExploreBudget'
import '../Search.css'
// import Tags from '../../0_Components/8_Tags/Tags'

import {
  optionsCompanySize,
  optionsIndustry,
  optionsSort,
  optionsStatusChallenges,
  optionsTypeChallenges,
  tempState
} from './_labels'

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
});

class SearchExplore extends React.Component {
  state = {
    "showType": false,
    "showSort": false,
    "showStatus": false,
    "showIndustry": false,
    "showCompanySize": false
  }

  changeBudgetC = sliderValues => {
    this.props.changeVal("budgetC", sliderValues)
  };

  toggleDropdown = (type) => {
    let newState = JSON.parse(JSON.stringify(tempState))
    newState[type] = !this.state[type]
    this.setState(newState)
  }

  render() {
    return (
      <div className="box-flex-col" id="d-left">
        <h2
          className="box-margin-bottom-30 box-text-extraBold box-color-black e-alignText box-flex-between">
          Filters
        </h2>

        <ExploreOption
          toggleDropdown={this.toggleDropdown}
          exploreOptionToggle={"showSort"}
          exploreOptionLabel={"Sort"}
          exploreOptionVal={this.props.search.sort}
          exploreState={"sort"}
          showVal={this.state.showSort}
          changeVal={this.props.changeVal}
          options={optionsSort}
        />

        <ExploreOption
          toggleDropdown={this.toggleDropdown}
          exploreOptionToggle={"showType"}
          exploreOptionLabel={"Type"}
          exploreOptionVal={this.props.search.typeChallenge}
          exploreState={"typeChallenge"}
          showVal={this.state.showType}
          changeVal={this.props.changeVal}
          options={optionsTypeChallenges}
        />

        <ExploreOption
          toggleDropdown={this.toggleDropdown}
          exploreOptionToggle={"showStatus"}
          exploreOptionLabel={"Status"}
          exploreOptionVal={this.props.search.statusChallenge}
          exploreState={"statusChallenge"}
          showVal={this.state.showStatus}
          changeVal={this.props.changeVal}
          options={optionsStatusChallenges}
        />

        <div className="search-spacer"></div>

        <ExploreOption
          toggleDropdown={this.toggleDropdown}
          exploreOptionToggle={"showIndustry"}
          exploreOptionLabel={"Industry"}
          exploreOptionVal={this.props.search.industry}
          exploreState={"industry"}
          showVal={this.state.showIndustry}
          changeVal={this.props.changeVal}
          options={optionsIndustry}
        />

        <ExploreOption
          toggleDropdown={this.toggleDropdown}
          exploreOptionToggle={"showCompanySize"}
          exploreOptionLabel={"Company Size"}
          exploreOptionVal={this.props.search.companySize}
          exploreState={"companySize"}
          showVal={this.state.showCompanySize}
          changeVal={this.props.changeVal}
          options={optionsCompanySize}
        />

        <div className="search-spacer"></div>
        
        {/* <h6 className="box-flex-row box-text-8 box-text-nobold box-color-mediumgray box-margin-top-10 box-margin-bottom-5">
          Communities
        </h6>
        <Tags tags={this.props.search.tags} changeVal={this.props.changeVal} />
        <div className="search-spacer box-margin-bottom-20"></div> */}

        <ExploreBudget
          budgetC={this.props.search.budgetC}
          budgetP={this.props.search.budgetP}
          toggleDropdown={this.toggleDropdown}
          showBudget={this.state.showBudget}
          changeBudgetC={this.changeBudgetC} />

        <div className="search-spacerBig"></div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchExplore)