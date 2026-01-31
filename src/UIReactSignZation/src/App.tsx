import { useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import CompanyList from './pages/CompanyList';
import CompanyForm from './pages/CompanyForm';
import DocumentList from './pages/DocumentList';
import DocumentForm from './pages/DocumentForm';
import './App.css';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className={`app-shell ${isCollapsed ? 'is-collapsed' : ''}`}>
        <aside className="sidebar">
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
