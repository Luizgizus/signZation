import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUserId } from '../auth';
import DataTable, { DataTableColumn } from '../components/DataTable';
import { Document } from '../dtos/document';
import { documentService } from '../services/documentService';
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

  const columns: DataTableColumn<Document>[] = [
    {
      header: 'Nome',
      render: (doc) => doc.name,
    },
    {
      header: 'Assinado',
      render: (doc) =>
        doc.signed ? (
          <span className="badge bg-success">Assinado</span>
        ) : (
          <span className="badge bg-warning text-dark">Pendente</span>
        ),
    },
    {
      header: 'Data limite de assinatura',
      render: (doc) => formatDateTime(doc.date_limit_to_sign),
    },
    {
      header: 'Data criação',
      render: (doc) => formatDateTime(doc.created_at),
    },
  ];

  return (
    <div className="container-fluid">
      {flash && (
        <div className="alert alert-success" role="alert">
          {flash}
        </div>
      )}
      <DataTable
        title="Documentos"
        data={documents}
        columns={columns}
        createTo="/document-create"
        emptyState={{
          iconClass: 'bi bi-file-earmark-text',
          title: 'Nenhum documento cadastrado',
          description: 'Crie o primeiro documento para começar.',
        }}
        getEditTo={(doc) => `/document-update/${doc.id}`}
        onDelete={(doc) => deleteDocument(doc.id)}
        getRowKey={(doc) => doc.id}
        actions={(doc) =>
          doc.signed ? (
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
          )
        }
      />
    </div>
  );
};

export default DocumentList;
