import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import HeroDetail from './components/HeroDetail.jsx';
import SearchResults from './pages/SearchResults.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-2 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hero/:id" element={<HeroDetail />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </Router>
  );
}