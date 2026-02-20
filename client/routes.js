import React from 'react'
import {withRouter, Redirect, Route, Switch} from 'react-router-dom'
import {AboutMe, Resume, TechnicalSkills, WorkExperience} from './components'

import constants from './constants/client-constants'

/**
 * COMPONENT
 */
const Routes = () => {
  // Routes for reference
  const routes = constants.routes

  return (
    <div className="routes-container" style={{height: '100%', width: '100%'}}>
      <Switch>
        <Route path={routes.aboutMe} component={AboutMe} />
        <Route path={routes.resume} component={Resume} />
        <Route path={routes.technicalSkills} component={TechnicalSkills} />
        <Route path={routes.workExperience} component={WorkExperience} />
        {/* Redirects to about component as default if not match/first load */}
        <Route
          render={() => {
            return <Redirect to={routes.aboutMe} />
          }}
        />
      </Switch>
    </div>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
