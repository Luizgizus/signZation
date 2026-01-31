import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { User } from '../models/user';
import { userService } from '../services/userService';

const UserForm = () => {
  const { id } = useParams();
  const isUpdateRoute = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    password: '',
  });
  const [oldPassword, setOldPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const getUserById = async (userId: string) => {
    try {
      const data = await userService.getById(userId);
      setUser((prev) => ({ ...prev, email: data.email ?? '' }));
      setOldPassword(data.password ?? '');
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isUpdateRoute && id) {
      getUserById(id);
    }
  }, [isUpdateRoute, id]);

  const saveUser = async () => {
    const data = {
      email: user.email,
      password: user.password,
    };

    try {
      await userService.create(data);
      navigate('/user', { state: { flash: 'Usuario criado com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const updateUser = async () => {
    if (!id) {
      return;
    }

    const data = {
      email: user.email,
      password: oldPassword,
    };

    try {
      await userService.update(id, data);
      navigate('/user', { state: { flash: 'Usuario atualizado com sucesso.' } });
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  const newUser = () => {
    setSubmitted(false);
    setUser({
      id: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <div className="drawer-backdrop" />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">{isUpdateRoute ? 'Atualizar usuário' : 'Novo usuário'}</h2>
          <Link to="/user" className="btn btn-light">
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
              <label htmlFor="user-email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="input-field w-100"
                id="user-email"
                required
                value={user.email ?? ''}
                onChange={(event) => setUser((prev) => ({ ...prev, email: event.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="user-password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="input-field w-100"
                id="user-password"
                required
                value={user.password ?? ''}
                onChange={(event) => setUser((prev) => ({ ...prev, password: event.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <Link to="/user" className="btn btn-light">
            Voltar
          </Link>
          {isUpdateRoute ? (
            <button onClick={updateUser} className="btn btn-info">
              Ataulizar
            </button>
          ) : (
            <button
              onClick={async () => {
                await saveUser();
                newUser();
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

export default UserForm;
