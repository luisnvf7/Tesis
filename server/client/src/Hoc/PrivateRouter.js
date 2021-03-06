/* React importaciones */
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/** Funcion creada para redireccionar hacia el login cuando el usuario no esta logeado */
const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
