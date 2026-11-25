import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { DartsListPage } from './pages/DartsListPage.jsx';
import { DartsSinglePage } from './pages/DartsSinglePage.jsx';
import { CreateDartsPage } from './pages/CreateDartsPage.jsx';
import { DartsModPage } from './pages/DartsModPage.jsx';
import { DeleteDartsPage } from './pages/DeleteDartsPage.jsx';

import './App.css';

export const App = () => {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
                <div className="container">
                    <NavLink to="/" className="navbar-brand fw-bold">
                        <i className="bi bi-bullseye me-2"></i>Darts
                    </NavLink>
                    <div className="navbar-nav">
                        <NavLink to="/" end className="nav-link">Dartsosok</NavLink>
                        <NavLink to="/new-darts" className="nav-link">
                            <i className="bi bi-plus-circle me-1"></i>Új dartsos
                        </NavLink>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<DartsListPage />} />
                <Route path="/darts/:dartsId" element={<DartsSinglePage />} />
                <Route path="/new-darts" element={<CreateDartsPage />} />
                <Route path="/mod-darts/:dartsId" element={<DartsModPage />} />
                <Route path="/del-darts/:dartsId" element={<DeleteDartsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
