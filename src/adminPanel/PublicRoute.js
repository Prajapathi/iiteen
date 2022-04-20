/* eslint-disable arrow-body-style */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useProfile } from './profile.context';

const PublicRoute = ({ children, ...routeProps }) => {
  const { isLoading, profile } = useProfile(); // we are getting two values here therefore we are distructuring the profile and isloading
  if (isLoading && !profile) {
    return (
      <div>
        Loading
      </div>
    );
  }else if (profile && !isLoading) {
    return <Redirect to="/previousyearsubjectwise" />;
  }else return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
