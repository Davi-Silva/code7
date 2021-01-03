export interface IStateProps {
  admin: {
    data: object;
    loading: boolean;
    fetched: boolean;
    error: boolean;
  };
  app: {
    isMoblie: boolean;
    dimensions: {
      width: number;
      height: number;
    };
    theme: {
      title: string;

      colors: {
        primary: string;
        secondary: string;

        background: string;
        text: string;

        switchers: {
          text: string;
          icon: string;

          background: string;
          border: string;
        };
      };
    };
  };
  navbar: {
    openLoginForm: boolean;
    openRegisterForm: boolean;
    openResetPasswiordForm: boolean;
    openUserModal: boolean;
    openUserDrawer: boolean;
  };
}
