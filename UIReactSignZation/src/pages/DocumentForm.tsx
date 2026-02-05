import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Company } from '../models/company';
import { Document } from '../models/document';
import { companyService } from '../services/companyService';
import { documentService } from '../services/documentService';
import { getCurrentUserId } from '../auth';

const DocumentForm = () => {
  const { id } = useParams();
  const isUpdateRoute = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId() ?? 0;

  const [document, setDocument] = useState<Document>({
    name: '',
    created_at: new Date(),
    last_updated_at: new Date(),
    date_limit_to_sign: '',
    signed: false,
    company: 0,
    created_by: currentUserId,
    updated_by: null,
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const loadCompanies = async () => {
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDocumentById = async (documentId: string) => {
    try {
      const data = await documentService.getById(documentId);
      setDocument((prev) => ({
        ...prev,
        name: data.name ?? '',
        date_limit_to_sign: data.date_limit_to_sign
          ? new Date(data.date_limit_to_sign).toISOString().slice(0, 16)
          : '',
        company: data.company ?? 0,
        created_by: data.created_by ?? currentUserId,
        updated_by: data.updated_by ?? null,
      }));
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (isUpdateRoute && id) {
      getDocumentById(id);
    }
  }, [id, isUpdateRoute]);

  const formatDateLimitToApi = (value?: string) => {
    if (!value) {
      return value;
    }
    if (value.length >= 19) {
      return value.slice(0, 19);
    }
    if (value.length === 16) {
      return `${value}:00`;
    }
    return value;
  };

  const saveDocument = async () => {
    const data = {
      name: document.name,
      date_limit_to_sign: formatDateLimitToApi(document.date_limit_to_sign),
      company: document.company,
      created_by: currentUserId,
    };

    try {
      await documentService.create(data);
      navigate('/document', { state: { flash: 'Documento criado com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const updateDocument = async () => {
    if (!id) {
      return;
    }

    const data = {
      name: document.name,
      created_at: document.created_at,
      last_updated_at: document.last_updated_at,
      date_limit_to_sign: formatDateLimitToApi(document.date_limit_to_sign),
      signed: document.signed,
      company: document.company,
      created_by: document.created_by,
      updated_by: currentUserId,
    };

    try {
      await documentService.update(id, data);
      navigate('/document', { state: { flash: 'Documento atualizado com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const newDocument = () => {
    setSubmitted(false);
    setDocument({
      name: '',
      date_limit_to_sign: '',
      signed: false,
      company: 2,
      created_by: currentUserId,
      updated_by: null,
    });
  };

  return (
    <>
      <div className="drawer-backdrop" />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">{isUpdateRoute ? 'Atualizar documento' : 'Novo documento'}</h2>
          <Link to="/document" className="btn btn-light">
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
              <label htmlFor="document-name" className="form-label">
                Nome*
              </label>
              <input
                type="text"
                className="input-field w-100"
                id="document-name"
                required
                value={document.name ?? ''}
                onChange={(event) => setDocument((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="document-date-limit" className="form-label">
                Data limite pra assinatura*
              </label>
              <input
                type="datetime-local"
                className="input-field w-100"
                id="document-date-limit"
                required
                value={document.date_limit_to_sign ?? ''}
                onChange={(event) =>
                  setDocument((prev) => ({ ...prev, date_limit_to_sign: event.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="document-company" className="form-label">
                Empresa desse documento
              </label>
              <select
                value={document.company ?? 0}
                onChange={(event) =>
                  setDocument((prev) => ({
                    ...prev,
                    company: Number.parseInt(event.target.value, 10),
                  }))
                }
                className="input-field w-100"
                id="document-company"
                aria-label="Empresa desse documento"
              >
                <option value={0}>Selecione uma empresa</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <Link to="/document" className="btn btn-light">
            Voltar
          </Link>
          {isUpdateRoute ? (
            <button onClick={updateDocument} className="btn btn-info">
              Ataulizar
            </button>
          ) : (
            <button
              onClick={async () => {
                await saveDocument();
                newDocument();
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

export default DocumentForm;
