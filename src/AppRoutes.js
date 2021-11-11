import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, useLocation } from "react-router-dom"
import ReactGA from 'react-ga'
import { QueryParamProvider } from 'use-query-params';
import AppRouteLoading from './pages/AppRouteLoading';

/* Pages */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Browse = lazy(() => import('./pages/Browse'));
const Person = lazy(() => import('./pages/Person'));
const Place = lazy(() => import('./pages/Place'));
const AllPlaces = lazy(() => import('./pages/AllPlaces'));
const Search = lazy(() => import('./pages/Search'));
const Collection = lazy(() => import('./pages/Collection'));
const Media = lazy(() => import('./pages/Media'));
const Timeline = lazy(() => import('./pages/Timeline'));
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
      <QueryParamProvider ReactRouterRoute={Route}>
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
          <Route exact path="/browse/person/:slug">
            <Person />
          </Route>
          <Route exact path="/browse/place/:slug">
            <Place />
          </Route>
          <Route exact path="/browse/all-places">
            <AllPlaces />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/collection">
            <Collection />
          </Route>
          <Route exact path="/collection/:slug">
            <Media />
          </Route>
          <Route exact path="/timeline">
            <Timeline />
          </Route>
          <Route exact path="/terms-of-use">
            <TermsOfUse />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </QueryParamProvider>
    </Suspense>
  )
}

export default AppRoutes
