import React from 'react'
import PropTypes from 'prop-types'
import { ItemsTypes } from './ItemsTypes'
import { LogoBasket } from '../Logo'

import * as Options from './selectOptions'

import './Items.scss'

function RenderOptions() {
  const options = Object.values(Options)
  options.unshift('Status da Entrega')
  return options.map((o, i) => (
    <option value={0} selected={i === 0} disabled={i === 0}>
      {o}
    </option>
  ))
}

function Item({ title, size, align, handleClick, type, complete }) {
  const components = {
    [ItemsTypes.SYMPTOMS]: (
      <div className={`item ${size} ${align}`}>
        <h5>{title}</h5>
      </div>
    ),
    [ItemsTypes.SELECT]: (
      <div className={`item ${size} ${align}`}>
        <select>{RenderOptions()}</select>
      </div>
    ),
    [ItemsTypes.BASKET]: (
      <div onClick={() => handleClick(title)} className={`item-basket ${size} ${align} ${complete ? 'complete' : ''}`}>
        <span>{`Cesta ${title}`}</span>
        <LogoBasket />
      </div>
    ),
  }

  return components[type]
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  complete: PropTypes.bool,
  handleClick: PropTypes.func,
}
Item.defaultProps = {
  type: ItemsTypes.SYMPTOMS,
  size: ItemsTypes.SMALL,
  align: ItemsTypes.CENTER,
  complete: false,
  handleClick: () => {},
}

export default Item
