import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../models/user';
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

  return (
    <div className="container-fluid">
      {flash && (
        <div className="alert alert-success" role="alert">
          {flash}
        </div>
      )}
      <div className="row align-items-center">
        <div className="col">
          <h1 className="display-1">Usuarios</h1>
        </div>
        <div className="col-auto ms-auto">
          <Link to="/user-create" className="btn btn-outline-success">
            <i className="bi bi-plus-lg"></i>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {users.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-people"></i>
              <h3>Sem usuários cadastrados</h3>
              <p>Cadastre o primeiro usuário para começar.</p>
            </div>
          ) : (
            <table className="table table-modern">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="actions-col">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id ?? index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.email}</td>
                    <td className="actions-cell">
                      <div className="actions-buttons">
                        <Link to={`/user-update/${user.id}`} className="btn btn-outline-warning">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteUser(user.id)}
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

export default UserList;
