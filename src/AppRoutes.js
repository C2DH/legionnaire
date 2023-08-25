import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
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

const GA = ({ gaCode }) => {
  useEffect(() => {
    if(gaCode) {
      console.log('ReactGA.initialize');
      ReactGA.initialize(gaCode, { legacyDimensionMetric: false });
      ReactGA.gtag('consent', 'default', {'analytics_storage': 'denied'});
    }
  }, [gaCode]);

  return null;
}


const ScrollToTop = _ => {
  let location = useLocation();
  useEffect(_ => window.scrollTo(0, 0), [location]);
  return null;
}


const AppRoutes = ({enableGA=false}) => {

  return (
    <BrowserRouter>
      <GA gaCode={process.env.REACT_APP_GA_CODE} />
      <ScrollToTop />
      <Suspense fallback={<AppRouteLoading/>}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
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
