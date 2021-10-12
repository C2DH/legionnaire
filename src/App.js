import { BrowserRouter } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollMemory />
      <Header />
      <main className="mt-5">
        <AppRoutes/>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
