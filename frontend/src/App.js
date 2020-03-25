import React, { useReducer } from 'react'
import * as Store from './store'
import { Routes } from './routes'

export default function App() {
  const [store, dispatch] = useReducer(Store.reducer, Store.initialState)

  return (
    <Store.Context.Provider value={{ store, dispatch }}>
      <Routes />
    </Store.Context.Provider>
  )
}
