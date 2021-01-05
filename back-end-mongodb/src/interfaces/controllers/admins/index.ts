export interface IRegisterAdminRequest {
  admin: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
}

export interface ILoginAdminRequest {
  admin: {
    email: string;
    password: string;
  };
}
