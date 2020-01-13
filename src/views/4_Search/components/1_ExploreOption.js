import React from 'react'

const ExploreOption = (props) => {
  return (
    <div className="box-position-relative box-expand-width">
      <button onClick={() => props.toggleDropdown(props.exploreOptionToggle)}
        className="box-margin-bottom-10 box-expand-width">
        <h6 className="box-flex-row box-text-8 box-text-nobold">{props.exploreOptionLabel}</h6>
        <h6 className="box-flex-row box-text-bold">{props.exploreOptionVal}</h6>
      </button>

      <div className={`e-dropdown-left box-flex-col box-text-8 ${props.showVal ? "box-show" : "box-hidden"}`}>
        <div className="e-dropdownHeight">{
          props.options.map((buttonOption) => {
            return (
              <button key={buttonOption.option}
                className={`e-dropdown-button ${false && "box-border-bottom"}`}
                onClick={() => { props.changeVal(props.exploreState, buttonOption.option); props.toggleDropdown(props.exploreOptionToggle); }}>
                <h5 className="box-flex-row e-alignText box-margin-bottom-3">{buttonOption.option}</h5>
                <h6 className="box-flex-row box-text-nobold box-text-7 e-alignText">{buttonOption.description}</h6>
              </button>
            )
          })
        }</div>
      </div>
    </div>
  )
}

export default ExploreOption