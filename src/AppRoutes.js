import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, useLocation } from "react-router-dom"
import ReactGA from 'react-ga'
import AppRouteLoading from './pages/AppRouteLoading'

/* Pages */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Browse = lazy(() => import('./pages/Browse'));
const Search = lazy(() => import('./pages/Search'));
const Collection = lazy(() => import('./pages/Collection'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const NotFound = lazy(() => import('./pages/NotFound'));
/* Pages routing by language */

const usePageViews = ({ enableGA }) => {
  let location = useLocation()

  useEffect(
    () => {
      const url = [location.pathname, location.search].join('')
      if (enableGA) {
        console.info('ReactGA.pageview:', url)
        ReactGA.pageview(url)
      } else {
        console.info('ReactGA.pageview disabled:', url)
      }
    },
    [location, enableGA]
  )
}

const AppRoutes = ({enableGA=false}) => {
  usePageViews({ enableGA })

  return (
    <Suspense fallback={<AppRouteLoading/>}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/browse">
          <Browse />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/collection">
          <Collection />
        </Route>
        <Route exact path="/terms">
          <TermsOfUse />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default AppRoutes
