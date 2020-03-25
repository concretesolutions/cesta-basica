import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from '../store'

function RouteWrapper({ component: Component, isPrivate, store, ...rest }) {
  const { auth } = store
  const { path } = rest

  if (!auth.token && isPrivate) {
    return <Redirect to="/login" />
  }

  // verificar role do usuario para saber qual rota direcionar no futuro
  if (auth.token && (path === '/login' || path === '/')) {
    return <Redirect to="/donation-list" />
  }

  return <Route {...rest} component={Component} />
}

RouteWrapper.propTypes = {
  store: PropTypes.object.isRequired,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}

export default connect(RouteWrapper)
