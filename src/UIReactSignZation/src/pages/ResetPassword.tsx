import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth';
import { authService } from '../services/authService';

const ResetPassword = () => {
  const userId = getCurrentUserId();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!userId) {
      setIsSuccess(false);
      setMessage('Sessão inválida. Faça login novamente.');
      setSubmitted(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setMessage('A confirmação de senha não confere.');
      setSubmitted(true);
      return;
    }

    try {
      const response = await authService.resetPassword(userId, oldPassword, newPassword);
      setIsSuccess(true);
      setMessage(response.detail);
      setSubmitted(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const err = error as Error;
      setIsSuccess(false);
      setMessage(err.message);
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="drawer-backdrop" />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">Resetar senha</h2>
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
              <label htmlFor="old-password" className="form-label">
                Senha antiga
              </label>
              <input
                id="old-password"
                type="password"
                className="input-field w-100"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="new-password" className="form-label">
                Senha nova
              </label>
              <input
                id="new-password"
                type="password"
                className="input-field w-100"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="form-label">
                Confirmar senha
              </label>
              <input
                id="confirm-password"
                type="password"
                className="input-field w-100"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <Link to="/company" className="btn btn-light">
            Voltar
          </Link>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Atualizar senha
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
