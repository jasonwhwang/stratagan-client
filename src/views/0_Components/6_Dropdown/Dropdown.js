import React from 'react'
import { IoIosArrowDown } from "react-icons/io"

const Dropdown = (props) => {
  return (
    <div className="box-position-relative">
      <button onClick={props.toggleDropdown} type="button"
        className="box-dropdown-button box-flex-between box-flex-acenter">
        <span>{props.dropdownVal}</span>
        <IoIosArrowDown />
      </button>
      <div className={`box-dropdown-left box-text-8 ${props.showDropdown ? "box-show" : "box-hidden"}`}>
        {
          props.options.map((buttonOption, index) => {
            return (
              <button key={index} type="button"
                className={`box-dropdown-button ${index !== props.options.length - 1 && "box-border-bottom"}`}
                onClick={() => props.changeDropdown(buttonOption)}>{buttonOption}</button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dropdown