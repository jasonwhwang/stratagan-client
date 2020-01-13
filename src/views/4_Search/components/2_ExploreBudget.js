import React from 'react'
import { Range } from 'rc-slider'

const ExploreBudget = (props) => {
  let budgetC = props.budgetC[1] >= 50000 ? "> $" + props.budgetC[1].toLocaleString() : "$" + props.budgetC[1].toLocaleString()
  budgetC = "$" + props.budgetC[0].toLocaleString() + " to " + budgetC

  return (
    <div className="box-expand-width">
      <h6 className="box-flex-row box-text-8 box-color-mediumgray box-text-nobold">Budget</h6>

      <div>
        <h6 className="box-flex-row-center box-text-bold box-text-7 box-color-gray box-margin-bottom-5">
          {budgetC}
        </h6>
        <div className="box-margin-bottom-20 box-margin-left-5 box-margin-right-5">
          <Range min={0} max={50000} step={500}
            onChange={props.changeBudgetC}
            defaultValue={props.budgetC} />
        </div>
      </div>

    </div>
  )
}

export default ExploreBudget