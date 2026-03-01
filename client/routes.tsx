import React, {useEffect} from 'react';
import {
  withRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import {AboutMe, Resume, TechnicalSkills, WorkExperience} from './components';

import constants from './constants/client-constants';

/**
 * Scrolls to the top of the page on every route change.
 * Targets both the window and the .app-container scroll host.
 */
const ScrollToTop = () => {
  const {pathname} = useLocation();
  useEffect(() => {
    // Scroll the inner scroll container if it exists
    const container = document.querySelector(
      '.app-container',
    ) as HTMLElement | null;
    if (container) {
      container.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    // Also scroll the window for safety
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [pathname]);
  return null;
};

/**
 * COMPONENT
 */
const Routes = () => {
  // Routes for reference
  const routes = constants.routes;

  return (
    <div className="routes-container">
      <ScrollToTop />
      <Switch>
        <Route path={routes.aboutMe} component={AboutMe} />
        <Route path={routes.resume} component={Resume} />
        <Route path={routes.technicalSkills} component={TechnicalSkills} />
        <Route path={routes.workExperience} component={WorkExperience} />
        {/* Redirects to about component as default if not match/first load */}
        <Route
          render={() => {
            return <Redirect to={routes.aboutMe} />;
          }}
        />
      </Switch>
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
