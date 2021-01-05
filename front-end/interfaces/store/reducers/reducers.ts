export interface IApp {
  isMobile: boolean;
  dimensions: number[];
  warnings: string[];
}

export interface IAdmin {
  data: {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: null | Date;
  };
  loading: boolean;
  fetched: boolean;
  errors: string[];
}

export interface INavbar {
  openLoginForm: boolean;
  openRegisterForm: boolean;
  openResetPasswordForm: boolean;
  openUserModal: boolean;
  openUserDrawer: boolean;
}

export interface IClient {}
