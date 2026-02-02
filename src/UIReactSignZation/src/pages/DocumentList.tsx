import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Document } from '../models/document';
import { documentService } from '../services/documentService';
import { getCurrentUserId } from '../auth';
import { formatDateTime } from '../utils/date';

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const location = useLocation();
  const flash = (location.state as { flash?: string } | undefined)?.flash;
  const currentUserId = getCurrentUserId();

  const loadDocuments = async () => {
    try {
      const data = await documentService.getAll();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const deleteDocument = async (id?: number) => {
    if (!id) {
      return;
    }
    const response = window.confirm('Tem certeza que deseja excluir Esse documento?');
    if (!response) {
      return;
    }

    try {
      await documentService.delete(id);
      await loadDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  const signDocument = async (id?: number, company?: number, createdBy?: number) => {
    if (!id) {
      return;
    }

    const data = {
      company,
      created_by: createdBy,
      updated_by: currentUserId,
    };

    try {
      await documentService.signDocument(id, data);
      await loadDocuments();
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
          <h1 className="display-1">Documentos</h1>
        </div>
        <div className="col-auto ms-auto">
          <Link to="/document-create" className="btn btn-outline-success">
            <i className="bi bi-plus-lg"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {documents.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-file-earmark-text"></i>
              <h3>Nenhum documento cadastrado</h3>
              <p>Crie o primeiro documento para começar.</p>
            </div>
          ) : (
            <table className="table table-modern">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Assinado</th>
                  <th scope="col">Data limite de assinatura</th>
                  <th scope="col">Data criação</th>
                  <th scope="col" className="actions-col">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={doc.id ?? index}>
                    <th scope="row">{index + 1}</th>
                    <td>{doc.name}</td>
                    <td>
                      {doc.signed ? (
                        <span className="badge bg-success">Assinado</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pendente</span>
                      )}
                    </td>
                    <td>{formatDateTime(doc.date_limit_to_sign)}</td>
                    <td>{formatDateTime(doc.created_at)}</td>
                    <td className="actions-cell">
                      <div className="actions-buttons">
                        <Link to={`/document-update/${doc.id}`} className="btn btn-outline-warning">
                          <i className="bi bi-pencil-square"></i>
                        </Link>

                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>

                        {doc.signed ? (
                          <button disabled={true} className="btn btn-outline-gray">
                            <i className="bi bi-pencil"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => signDocument(doc.id, doc.company, doc.created_by)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                        )}
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

export default DocumentList;
