import { IAdmin, IApp, INavbar } from '../store/reducers/reducers';

export interface IStateProps {
  admin: IAdmin;
  app: IApp;
  navbar: INavbar;
}
