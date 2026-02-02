import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Company } from '../models/company';
import { companyService } from '../services/companyService';
import { formatDateTime } from '../utils/date';

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const location = useLocation();
  const flash = (location.state as { flash?: string } | undefined)?.flash;

  const loadCompanies = async () => {
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const deleteCompany = async (id?: number | string) => {
    if (!id) {
      return;
    }
    const response = window.confirm('Tem certeza que deseja excluir a empresa?');
    if (!response) {
      return;
    }

    try {
      await companyService.delete(id);
      await loadCompanies();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      {flash && (
        <div className="alert alert-success" role="alert">
          {flash}
        </div>
      )}
      <div className="row align-items-center">
        <div className="col">
          <h1 className="display-1">Empresas</h1>
        </div>
        <div className="col-auto ms-auto">
          <Link to="/company-create" className="btn btn-outline-success">
            <i className="bi bi-plus-lg"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {companies.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-building"></i>
              <h3>Nenhuma empresa cadastrada</h3>
              <p>Cadastre a primeira empresa para começar.</p>
            </div>
          ) : (
            <table className="table table-modern">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Time Zone</th>
                  <th scope="col">Lingua</th>
                  <th scope="col">Data criação</th>
                  <th scope="col" className="actions-col">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={company.id ?? index}>
                    <th scope="row">{index + 1}</th>
                    <td>{company.name}</td>
                    <td>{company.locale}</td>
                    <td>{company.lang}</td>
                    <td>{formatDateTime(company.created_at)}</td>
                    <td className="actions-cell">
                      <div className="actions-buttons">
                        <Link to={`/company-update/${company.id}`} className="btn btn-outline-warning">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteCompany(company.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
