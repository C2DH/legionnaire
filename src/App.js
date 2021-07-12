import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRoutes/>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
