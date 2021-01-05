import React, { FC } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import _ from 'lodash';

import {
  Background,
  DrawerDiv,
  List,
  ListItem,
  LogoutButton,
  ListItemAdmin,
  LoginButton
} from '../../../../styles/components/UI/Modals/UserDrawer/UserDrawer';

import { IAdminDrawer } from '../../../../interfaces/components/UI/Modals/Modals';

import { logoutUser } from '../../../../store/actions/user/user';
import {
  openLoginForm,
  closeRegisterForm,
  closeResetPasswordForm,
  closeUserDrawer
} from '../../../../store/actions/navbar/navbar';

const mapStateToProps = (state) => {
  const { admin, navbar } = state;

  return {
    admin,
    navbar
  };
};

const UserDrawer: FC<IAdminDrawer> = ({
  openUserModal,
  openUserDrawer,
  handleCloseUserDrawer,
  handleToggleUserModalForm,
  admin,
  navbar
}) => {
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(closeUserDrawer());
    dispatch(logoutUser());
  };

  const handleOpenLoginForm = () => {
    dispatch(closeUserDrawer());
    dispatch(openLoginForm());
    dispatch(closeRegisterForm());
    dispatch(closeResetPasswordForm());
  };

  return (
    <>
      {openUserDrawer && (
        <>
          <Background
            openUserModal={openUserModal}
            onClick={() => handleCloseUserDrawer()}
          />
          <DrawerDiv openUserModal={openUserModal}>
            <List>
              {!_.isEmpty(admin.data) &&
              !admin.loading &&
              admin.errors.length === 0 &&
              admin.fetched ? (
                <ListItemAdmin>{admin.data.name}</ListItemAdmin>
              ) : (
                <LoginButton onClick={() => handleOpenLoginForm()}>
                  Login
                </LoginButton>
              )}

              <Link href="/account" as="/account">
                <ListItem onClick={() => handleToggleUserModalForm()}>
                  Account
                </ListItem>
              </Link>
              <Link href="/" as="/">
                <ListItem onClick={() => handleToggleUserModalForm()}>
                  Home
                </ListItem>
              </Link>
              <Link href="/buyers" as="/buyers">
                <ListItem onClick={() => handleToggleUserModalForm()}>
                  Buyers
                </ListItem>
              </Link>
              <Link href="/sellers" as="/sellers">
                <ListItem onClick={() => handleToggleUserModalForm()}>
                  Sellers
                </ListItem>
              </Link>
            </List>
            {!_.isEmpty(admin.data) &&
              !admin.loading &&
              admin.errors.length === 0 &&
              admin.fetched && (
                <LogoutButton onClick={() => handleLogoutUser()}>
                  Log out
                </LogoutButton>
              )}
          </DrawerDiv>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps)(UserDrawer);
