import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.scss'

function Sidebar({ steps, current }) {
  const RenderLines = () => {
    const classNames = []
    for (let i = 1; i <= steps; i += 1) {
      classNames.push(i === current ? 'active' : '')
    }
    return classNames.map((className, index) => <li key={index} className={className} />)
  }

  return (
    <div className="container-steps">
      <ul className="progress-bar">{RenderLines()}</ul>
    </div>
  )
}

Sidebar.propTypes = {
  steps: PropTypes.number,
  current: PropTypes.number,
}
Sidebar.defaultProps = {
  steps: 3,
  current: 1,
}

export default Sidebar
