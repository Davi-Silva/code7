import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from 'react';
import { useDispatch, connect } from 'react-redux';

import Warnings from '../../Warnings/Warnings';

import {
  Background,
  FormDiv,
  Heading,
  Form,
  Input,
  Label,
  Submit,
  Warning,
  Button
} from '../../../../styles/components/UI/Modals/LoginForm/LoginForm';

import { loginUser } from '../../../../store/actions/user/user';
import { resetWarnings, setWarnings } from '../../../../store/actions/app/app';

import { ILoginFormProps } from '../../../../interfaces/components/UI/Modals/Modals';

const mapStateToProps = ({ admin, app }) => {
  return { admin, app };
};

const LoginForm: FC<ILoginFormProps> = ({
  handleToggleLoginForm,
  handleOpenRegisterForm,
  handleOpenResetPasswordForm,
  admin,
  app
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  function resetWarningMessages(): void {
    dispatch(resetWarnings());
  }

  function addWarningMessage(message: string): void {
    dispatch(setWarnings(message));
  }

  useEffect(() => {
    if (admin.errors.length > 0) {
      admin.errors.forEach((error: string) => {
        addWarningMessage(error);
      });
    } else {
      resetWarningMessages();
    }
  }, [admin]);

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function checkValidForm(): boolean {
    if (email.length > 0 && password.length > 0) {
      resetWarningMessages();
      return true;
    } else {
      addWarningMessage('All fields must be filled');
      return false;
    }
  }

  function handleSubmitLogin(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    resetWarningMessages();
    if (checkValidForm()) {
      dispatch(loginUser({ admin: { email, password } }));
    }
  }

  return (
    <>
      <Background onClick={(): void => handleToggleLoginForm()} />
      <FormDiv>
        <Heading>| Login</Heading>
        <Form
          onSubmit={(e: FormEvent<HTMLFormElement>): void =>
            handleSubmitLogin(e)
          }
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              onChangeEmail(e)
            }
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              onChangePassword(e)
            }
          />
          <Submit type="submit">Login</Submit>
          <Warnings
            warning={app.warnings.length > 0}
            warningMessages={app.warnings}
          />
          <Button
            type="button"
            onClick={(): void => handleOpenResetPasswordForm()}
          >
            Reset Password
          </Button>
          <Button type="button" onClick={(): void => handleOpenRegisterForm()}>
            Don't have an account yet?
          </Button>
        </Form>
      </FormDiv>
    </>
  );
};

export default connect(mapStateToProps)(LoginForm);
