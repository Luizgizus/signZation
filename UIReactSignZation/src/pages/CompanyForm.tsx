import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Company } from '../models/company';
import { companyService } from '../services/companyService';
import { getCurrentUserId } from '../auth';

const CompanyForm = () => {
  const { id } = useParams();
  const isUpdateRoute = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId() ?? 0;

  const [company, setCompany] = useState<Company>({
    id: '',
    name: '',
    lang: 'pt',
    locale: '-3',
    created_by: currentUserId,
    updated_by: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const getCompanyById = async (companyId: string) => {
    try {
      const data = await companyService.getById(companyId);
      setCompany({
        id: data.id,
        name: data.name ?? '',
        lang: data.lang ?? 'pt',
        locale: data.locale ?? '-3',
        created_by: data.created_by ?? currentUserId,
        updated_by: data.updated_by ?? null,
      });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isUpdateRoute && id) {
      getCompanyById(id);
    }
  }, [id, isUpdateRoute]);

  const saveCompany = async () => {
    const data = {
      name: company.name,
      lang: company.lang,
      locale: company.locale,
      created_by: currentUserId,
    };

    try {
      await companyService.create(data);
      navigate('/company', { state: { flash: 'Empresa criada com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const updateCompany = async () => {
    if (!id) {
      return;
    }

    const data = {
      name: company.name,
      lang: company.lang,
      locale: company.locale,
      created_by: company.created_by,
      updated_by: currentUserId,
    };

    try {
      await companyService.update(id, data);
      navigate('/company', { state: { flash: 'Empresa atualizada com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const newCompany = () => {
    setSubmitted(false);
    setCompany({
      id: '',
      name: '',
      lang: 'pt',
      locale: '-3',
      created_by: currentUserId,
      updated_by: null,
    });
  };

  return (
    <>
      <div className="drawer-backdrop" />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">{isUpdateRoute ? 'Atualizar empresa' : 'Nova empresa'}</h2>
          <Link to="/company" className="btn btn-light">
            Fechar
          </Link>
        </div>

        <div className="drawer-body">
          {submitted && (
            <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}

          <div className="form-section">
            <div>
              <label htmlFor="company-name" className="form-label">
                Nome*
              </label>
              <input
                type="text"
                className="input-field w-100"
                id="company-name"
                required
                value={company.name ?? ''}
                onChange={(event) => setCompany((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="company-lang" className="form-label">
                Lingua
              </label>
              <input
                type="text"
                className="input-field w-100"
                id="company-lang"
                required
                value={company.lang ?? ''}
                onChange={(event) => setCompany((prev) => ({ ...prev, lang: event.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="company-locale" className="form-label">
                Time Zone
              </label>
              <input
                type="text"
                className="input-field w-100"
                id="company-locale"
                required
                value={company.locale ?? ''}
                onChange={(event) => setCompany((prev) => ({ ...prev, locale: event.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <Link to="/company" className="btn btn-light">
            Voltar
          </Link>
          {isUpdateRoute ? (
            <button onClick={updateCompany} className="btn btn-info">
              Ataulizar
            </button>
          ) : (
            <button
              onClick={async () => {
                await saveCompany();
                newCompany();
              }}
              className="btn btn-success"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
