/* eslint-disable arrow-body-style */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useProfile } from './profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  console.log(useProfile())
  const { isLoading, profile } = useProfile(); // this useProfile will return the value and will be the value which is around profilecontext.provider in profile.context.js
  if (isLoading && !profile) {
    return (
      <div>
        Loading
      </div>
    );
  }else if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }
  else return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
