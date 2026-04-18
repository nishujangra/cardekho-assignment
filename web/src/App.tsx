import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import FindPage from './pages/FindPage';
import ComparePage from './pages/ComparePage';
import ShortlistsPage from './pages/ShortlistsPage';
import ShortlistDetailPage from './pages/ShortlistDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="find" element={<FindPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="shortlists" element={<ShortlistsPage />} />
          <Route path="shortlists/:id" element={<ShortlistDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
