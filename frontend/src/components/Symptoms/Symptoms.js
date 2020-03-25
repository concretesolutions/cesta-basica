import React from 'react'
import { Items } from '../Items'

import './Symptoms.scss'

function Symptoms() {
  return (
    <div className="container-symptoms">
      <Items title="Febre" />
      <Items title="Tosse seca" />
      <Items title="Tosse com Catarro" />
      <Items title="Congestão Nasal" />
      <Items title="Corrimento no Nariz" />
      <Items title="Dificuldade para Respirar" />
      <Items title="Dor de Cabeça" />
      <Items title="Dor de Garganta" />
      <Items title="Dor no Peito" />
      <Items title="Dor no Corpo" />
    </div>
  )
}

export default Symptoms
