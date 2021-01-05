import { IApp, IAdmin, INavbar } from '../../../store/reducers/reducers';

export interface ILoginFormProps {
  handleToggleLoginForm: () => void;
  handleOpenRegisterForm: () => void;
  handleOpenResetPasswordForm: () => void;
  admin: IAdmin;
  app: IApp;
}

export interface IRegistrationFormProps {
  handleOpenLoginForm: () => void;
  handleOpenResetPasswordForm: () => void;
  handleToggleRegisterForm: () => void;
  app: IApp;
}

export interface IAdminRegistrationFunction {
  admin: {
    name: string;
    username: string;
    email: string;
    password: string;
    password2: string;
  };
}

export interface IAdminDrawer {
  openUserModal: boolean;
  openUserDrawer: boolean;
  handleToggleUserModalForm: () => void;
  handleCloseUserDrawer: () => void;
  admin: IAdmin;
  navvbar: INavbar;
}
