import React, {Component} from 'react'

export default class PageButtons extends Component {
  render () {
    const numPages = Math.ceil(this.props.dataLength / this.props.perPage)
    const buttonsNeeded = numPages > 0 ? Array(numPages).fill() : Array(1).fill()
    const buttons = buttonsNeeded.map((element, index) => {
      return (
        <button
          value={index + 1}
          key={'button' + index}
          onClick={this.props.changePage}>
          {index + 1}
        </button>
      )
    })
    return (
      <div id='buttons'>
        {buttons}
      </div>
    )
  }
}
