import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="mt-5">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
