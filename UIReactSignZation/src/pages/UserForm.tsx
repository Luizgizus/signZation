import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUserId } from '../auth';
import DrawerLayout from '../components/DrawerLayout';
import { User } from '../dtos/user';
import { userService } from '../services/userService';

const UserForm = () => {
  const { id } = useParams();
  const isUpdateRoute = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

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
      created_by: currentUserId,
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
      updated_by: currentUserId,
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
    <DrawerLayout
      title={isUpdateRoute ? 'Atualizar usuário' : 'Novo usuário'}
      closeTo="/user"
      backTo="/user"
      alert={{
        visible: submitted,
        isSuccess,
        message,
      }}
      footerActions={
        isUpdateRoute ? (
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
        )
      }
    >
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
    </DrawerLayout>
  );
};

export default UserForm;
