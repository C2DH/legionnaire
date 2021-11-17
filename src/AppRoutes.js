import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import ReactGA from 'react-ga'
import { QueryParamProvider } from 'use-query-params';
import App from './App';
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


const GA = ({ enabled = false }) => {

  let location = useLocation();

  useEffect(
    () => {
      const url = [location.pathname, location.search].join('')
      if (enabled) {
        console.info('ReactGA.pageview:', url)
        ReactGA.pageview(url)
      } else {
        console.info('ReactGA.pageview disabled:', url)
      }
    },
    [location, enabled]
  )

  return null;
}


const ScrollToTop = _ => {
  let location = useLocation();
  useEffect(_ => window.scrollTo(0, 0), [location]);
  return null;
}


/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};


const AppRoutes = ({enableGA=false}) => {

  return (
    <BrowserRouter>
      <GA enabled={enableGA} />
      <ScrollToTop />
      <Suspense fallback={<AppRouteLoading/>}>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="browse">
                <Route index element={<Browse />} />
                <Route path="person/:slug" element={<Person />} />
                <Route path="place/:slug" element={<Place />} />
                <Route path="all-places" element={<AllPlaces />} />
              </Route>
              <Route path="search" element={<Search />} />
              <Route path="collection">
                <Route index element={<Collection />} />
                <Route path=":slug" element={<Media />} />
              </Route>
              <Route path="timeline" element={<Timeline />} />
              <Route path="terms-of-use" element={<TermsOfUse />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </QueryParamProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
