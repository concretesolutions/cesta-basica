import React from 'react'
import './Loader.scss'
import { icLoader } from '../../assets/icons'

export default function Loader() {
  return (
    <div className="containerSpin">
      <div className="spin">
        <img src={icLoader} alt="icone circular, movimentando-se em circulos." height="50" />
      </div>
    </div>
  )
}
