import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable, { DataTableColumn } from '../components/DataTable';
import { Company } from '../dtos/company';
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

  const columns: DataTableColumn<Company>[] = [
    {
      header: 'Nome',
      render: (company) => company.name,
    },
    {
      header: 'Time Zone',
      render: (company) => company.locale,
    },
    {
      header: 'Lingua',
      render: (company) => company.lang,
    },
    {
      header: 'Data criação',
      render: (company) => formatDateTime(company.created_at),
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
        title="Empresas"
        data={companies}
        columns={columns}
        createTo="/company-create"
        emptyState={{
          iconClass: 'bi bi-building',
          title: 'Nenhuma empresa cadastrada',
          description: 'Cadastre a primeira empresa para começar.',
        }}
        getEditTo={(company) => `/company-update/${company.id}`}
        onDelete={(company) => deleteCompany(company.id)}
        getRowKey={(company) => company.id}
      />
    </div>
  );
};

export default CompanyList;
