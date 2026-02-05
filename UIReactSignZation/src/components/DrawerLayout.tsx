import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type DrawerAlert = {
  visible: boolean;
  isSuccess: boolean;
  message: string;
};

type DrawerLayoutProps = {
  title: string;
  closeTo: string;
  backTo?: string;
  alert?: DrawerAlert;
  children: ReactNode;
  footerActions?: ReactNode;
};

const DrawerLayout = ({
  title,
  closeTo,
  backTo,
  alert,
  children,
  footerActions,
}: DrawerLayoutProps) => {
  return (
    <>
      <div className="drawer-backdrop" />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">{title}</h2>
          <Link to={closeTo} className="btn btn-light">
            Fechar
          </Link>
        </div>

        <div className="drawer-body">
          {alert?.visible && (
            <div className={`alert ${alert.isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
              {alert.message}
            </div>
          )}
          {children}
        </div>

        <div className="drawer-footer">
          {backTo && (
            <Link to={backTo} className="btn btn-light">
              Voltar
            </Link>
          )}
          {footerActions}
        </div>
      </div>
    </>
  );
};

export default DrawerLayout;
