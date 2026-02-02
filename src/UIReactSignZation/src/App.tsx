import { useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import CompanyList from './pages/CompanyList';
import CompanyForm from './pages/CompanyForm';
import DocumentList from './pages/DocumentList';
import DocumentForm from './pages/DocumentForm';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
import { clearSession } from './auth';
import './App.css';

const AppShell = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  const navigate = useNavigate();

  if (isLoginRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className={`app-shell ${isCollapsed ? 'is-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-main">
          <div className="sidebar-header">
            <h1 className="brand">SignZation</h1>
            <button
              type="button"
              className="sidebar-toggle"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              <i className={`bi ${isCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar'}`}></i>
            </button>
          </div>

          <div className="nav-section">
            <span className="nav-label">Gestão</span>
            <NavLink
              to="/user"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-person"></i>
              <span className="nav-text">Usuarios</span>
            </NavLink>
            <NavLink
              to="/company"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-building"></i>
              <span className="nav-text">Empresas</span>
            </NavLink>
            <NavLink
              to="/document"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-file-text"></i>
              <span className="nav-text">Documentos</span>
            </NavLink>
          </div>
        </div>

        <div className="nav-section sidebar-footer">
          <span className="nav-label">Conta</span>
          <NavLink
            to="/reset-password"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="bi bi-key"></i>
            <span className="nav-text">Resetar senha</span>
          </NavLink>
          <button
            type="button"
            className="nav-link logout-button"
            onClick={() => {
              clearSession();
              navigate('/login', { replace: true });
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span className="nav-text">Sair</span>
          </button>
        </div>
      </aside>

      <button
        type="button"
        className="mobile-toggle"
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-label={isCollapsed ? 'Fechar menu' : 'Abrir menu'}
      >
        <i className={`bi ${isCollapsed ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      <main className="main-content">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/user" replace />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user-create" element={<UserForm />} />
            <Route path="/user-update/:id" element={<UserForm />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company-create" element={<CompanyForm />} />
            <Route path="/company-update/:id" element={<CompanyForm />} />
            <Route path="/document" element={<DocumentList />} />
            <Route path="/document-create" element={<DocumentForm />} />
            <Route path="/document-update/:id" element={<DocumentForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/login" element={<Navigate to="/company" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
