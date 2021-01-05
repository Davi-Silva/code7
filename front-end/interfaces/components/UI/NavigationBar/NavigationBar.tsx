export interface IStateToPropUser {
  user: {
    data: object;
    loading: boolean;
    fetched: boolean;
    errors: string[];
  };
  app: {
    isMobile: boolean;
    dimensions: {
      width: number;
      height: number;
    };
  };
  navbar: {
    openLoginForm: boolean;
    openRegisterForm: boolean;
    openResetPasswordForm: boolean;
    openUserModal: boolean;
    openUserDrawer: boolean;
  };
}
