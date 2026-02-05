import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable, { DataTableColumn } from '../components/DataTable';
import { User } from '../dtos/user';
import { userService } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  const flash = (location.state as { flash?: string } | undefined)?.flash;

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id?: number | string) => {
    if (!id) {
      return;
    }
    const response = window.confirm('Tem certeza que deseja excluir um usuario?');
    if (!response) {
      return;
    }

    try {
      await userService.delete(id);
      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: DataTableColumn<User>[] = [
    {
      header: 'Email',
      render: (user) => user.email,
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
        title="Usuarios"
        data={users}
        columns={columns}
        createTo="/user-create"
        emptyState={{
          iconClass: 'bi bi-people',
          title: 'Sem usuários cadastrados',
          description: 'Cadastre o primeiro usuário para começar.',
        }}
        getEditTo={(user) => `/user-update/${user.id}`}
        onDelete={(user) => deleteUser(user.id)}
        getRowKey={(user) => user.id}
      />
    </div>
  );
};

export default UserList;
