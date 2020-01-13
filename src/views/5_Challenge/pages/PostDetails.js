import React from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

class PostDetails extends React.Component {
  state = {
    showDropdown: false,
    options: ["Draft", "Open", "Closed", "Completed"],
    showDropdown2: false,
    options2: ["Consulting", "Project", "Recruitment"]
  }
  toggleDropdown = () => {
    this.setState({
      ...this.state, showDropdown: !this.state.showDropdown,
      showDropdown2: false
    })
  }
  changeDropdown = (val) => {
    this.props.changeVal("status", val)
    this.toggleDropdown()
  }

  toggleDropdown2 = () => {
    this.setState({
      ...this.state, showDropdown2: !this.state.showDropdown2,
      showDropdown: false
    })
  }
  changeDropdown2 = (val) => {
    this.props.changeVal("type", val)
    this.toggleDropdown2()
  }

  changeInput = (e) => {
    let text = e.target.value.replace(/[^0-9]/gi, '')
    this.props.changeVal("budget", text)
  }

  render() {
    return (
      <div className="box-position-relative box-flex-row box-flex-wrap box-margin-bottom-60">
        <PostDropdown
          label={"Status"}
          showDropdown={this.state.showDropdown}
          toggleDropdown={this.toggleDropdown}
          dropdownVal={this.props.status}
          changeDropdown={this.changeDropdown}
          options={this.state.options} />
        <PostDropdown
          label={"Type"}
          showDropdown={this.state.showDropdown2}
          toggleDropdown={this.toggleDropdown2}
          dropdownVal={this.props.type}
          changeDropdown={this.changeDropdown2}
          options={this.state.options2} />
        <div className="box-margin-right-10 box-margin-top-10">
          <h6 className="box-text-bold box-color-mediumgray box-text-7 box-margin-bottom-3">
            Budget
          </h6>
          <input
            id="budget"
            onChange={this.changeInput}
            value={this.props.budget}
            className="box-input c-titleHeight" />
        </div>
        <div className="flatpickr-minWidth box-margin-top-10">
          <h6 className="box-text-bold box-color-mediumgray box-text-7 box-margin-bottom-3">
            Start & End Dates
          </h6>
          <div className="c-titleHeight">
            <Flatpickr
              options={{
                mode: "range",
                defaultDate: [this.props.startDate, this.props.endDate],
                minDate: 'today',
                altInput: true,
                altFormat: "F j, Y"
              }}
              onChange={date => { 
                this.props.changeVal("startDate", date[0])
                this.props.changeVal("endDate", date[1])
              }} />
          </div>
        </div>
      </div>
    )
  }
}

const PostDropdown = (props) => {
  return (
    <div className="box-position-relative box-margin-right-10 box-margin-top-10">
      <h6 className="box-text-bold box-color-mediumgray box-text-7 box-margin-bottom-3">{props.label}</h6>

      <div className="box-position-relative">
        <button onClick={props.toggleDropdown} type="button"
          className="explore-button-minWidth box-button-line-gray box-text-bold box-flex-row-center box-color-mediumgray c-titleHeight">
          <span>{props.dropdownVal}</span>
        </button>
        <div className={`explore-dropdown box-flex-col box-text-8 ${props.showDropdown ? "box-show" : "box-hidden"}`}>
          {
            props.options.map((buttonOption, index) => {
              return (
                <button key={buttonOption + index} type="button"
                  className={`explore-dropdownButton ${index !== props.options.length - 1 && "box-border-bottom"}`}
                  onClick={() => props.changeDropdown(buttonOption)}>{buttonOption}</button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PostDetails