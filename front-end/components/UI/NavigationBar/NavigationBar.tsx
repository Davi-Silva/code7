import React, { FC } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import { FaBars } from 'react-icons/fa';

import LoginForm from '../Modals/LoginForm/LoginForm';
import RegisterForm from '../Modals/RegisterForm/RegisterForm';
import ResetPasswordForm from '../Modals/ResetPasswordForm/ResetPasswordForm';
import UserModal from '../Modals/UserModal/UserModal';
import UserDrawer from '../Modals/UserDrawer/UserDrawer';

import { IStateProps } from '../../../interfaces/components/Layout';

import {
  closeLoginForm,
  closeRegisterForm,
  closeResetPasswordForm,
  closeUserDrawer,
  closeUserModal,
  openLoginForm,
  openRegisterForm,
  openResetPasswordForm,
  openUserDrawer,
  toggleLoginForm,
  toggleRegisterForm,
  toggleResetPasswordForm,
  toggleUserModal
} from '../../../store/actions/navbar/navbar';

import {
  NavigationBarDiv,
  Container,
  BrandA,
  DrawerButton,
  LoadingDiv,
  LoginButton,
  Menu,
  MenuItem,
  AdminButton
} from '../../../styles/components/UI/NavigationBar/NavigationBar';

const mapStateToProps = (state: IStateProps) => {
  const { admin, app, navbar } = state;
  return {
    admin,
    app,
    navbar
  };
};

const NavigationBar: FC<IStateProps> = ({ admin, app, navbar }) => {
  const dispatch = useDispatch();

  const handleToggleLoginForm = () => {
    dispatch(toggleLoginForm(navbar.openLoginForm));
  };

  const handleOpenUserDrawer = () => {
    dispatch(openUserDrawer());
  };

  const handleCloseUserDrawer = () => {
    dispatch(closeUserDrawer());
  };

  const handleToggleRegisterForm = () => {
    dispatch(toggleRegisterForm(navbar.openRegisterForm));
  };

  const handleToggleResetPasswordForm = () => {
    dispatch(toggleResetPasswordForm(navbar.openResetPasswordForm));
  };

  const handleToggleUserModalForm = () => {
    dispatch(toggleUserModal(navbar.openUserModal));
  };

  const handleOpenLoginForm = () => {
    dispatch(openLoginForm());
    dispatch(closeRegisterForm());
    dispatch(closeResetPasswordForm());
  };

  const handleOpenRegisterForm = () => {
    dispatch(closeLoginForm());
    dispatch(openRegisterForm());
    dispatch(closeResetPasswordForm());
  };

  const handleOpenResetPasswordForm = () => {
    dispatch(closeLoginForm());
    dispatch(closeRegisterForm());
    dispatch(openResetPasswordForm());
  };

  const closeAllForms = () => {
    dispatch(closeLoginForm());
    dispatch(closeRegisterForm());
    dispatch(closeResetPasswordForm());
    dispatch(closeUserModal());
  };

  return (
    <>
      {_.isEmpty(admin.data) && (
        <>
          {navbar.openLoginForm && (
            <LoginForm
              handleToggleLoginForm={handleToggleLoginForm}
              handleOpenRegisterForm={handleOpenRegisterForm}
              handleOpenResetPasswordForm={handleOpenResetPasswordForm}
            />
          )}
          {navbar.openRegisterForm && (
            <RegisterForm
              handleOpenLoginForm={handleOpenLoginForm}
              handleOpenResetPasswordForm={handleOpenResetPasswordForm}
              handleToggleRegisterForm={handleToggleRegisterForm}
            />
          )}
          {navbar.openResetPasswordForm && (
            <ResetPasswordForm
              handleOpenLoginForm={handleOpenLoginForm}
              handleToggleResetPasswordForm={handleToggleResetPasswordForm}
            />
          )}
        </>
      )}
      <NavigationBarDiv>
        <Container>
          <Link href="/" as="/">
            <BrandA>Code7</BrandA>
          </Link>
          <div>
            {app.isMobile ? (
              <>
                <DrawerButton onClick={() => handleOpenUserDrawer()}>
                  <FaBars />
                </DrawerButton>
                {app.isMobile && (
                  <UserDrawer
                    openUserModal={navbar.openUserModal}
                    openUserDrawer={navbar.openUserDrawer}
                    handleCloseUserDrawer={handleCloseUserDrawer}
                    handleToggleUserModalForm={handleToggleUserModalForm}
                  />
                )}
              </>
            ) : (
              <Menu>
                <Link href="/" as="/">
                  <MenuItem>Home</MenuItem>
                </Link>
                {!_.isEmpty(admin.data) &&
                  !admin.loading &&
                  admin.errors.length === 0 &&
                  admin.fetched && (
                    <AdminButton onClick={() => handleToggleUserModalForm()}>
                      {admin.data.name}
                    </AdminButton>
                  )}
                {admin.loading && <LoadingDiv>Loading</LoadingDiv>}
                {_.isEmpty(admin.data) && !admin.loading && (
                  <LoginButton onClick={() => handleOpenLoginForm()}>
                    Login
                  </LoginButton>
                )}
                {!_.isEmpty(admin.data) &&
                  !admin.loading &&
                  admin.errors.length === 0 &&
                  admin.fetched &&
                  !app.isMobile &&
                  navbar.openUserModal && <UserModal />}
              </Menu>
            )}
          </div>
        </Container>
      </NavigationBarDiv>
    </>
  );
};

export default connect(mapStateToProps)(NavigationBar);
