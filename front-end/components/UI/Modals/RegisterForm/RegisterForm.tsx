import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { post } from '../../../../services/api';

import Warnings from '../../Warnings/Warnings';

import {
  Background,
  FormDiv,
  Heading,
  Form,
  Input,
  Label,
  Submit,
  Button,
  Loading
} from '../../../../styles/components/UI/Modals/LoginForm/LoginForm';

import { resetWarnings, setWarnings } from '../../../../store/actions/app/app';

import {
  IRegistrationFormProps,
  IAdminRegistrationFunction
} from '../../../../interfaces/components/UI/Modals/Modals';

import { toSlugLowerCase } from '../../../../utils/string';

const mapStateToProps = ({ app }) => {
  return { app };
};

const RegisterForm: FC<IRegistrationFormProps> = ({
  handleOpenLoginForm,
  handleOpenResetPasswordForm,
  handleToggleRegisterForm,
  app
}) => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();

  function resetWarningMessages(): void {
    dispatch(resetWarnings());
  }

  function addWarningMessage(message: string): void {
    dispatch(setWarnings(message));
  }

  function onChangeName(e: ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function onChangeUsername(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(toSlugLowerCase(e.target.value));
  }

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function onChangePassword2(e: ChangeEvent<HTMLInputElement>): void {
    setPassword2(e.target.value);
  }

  function checkValidForm(): boolean {
    if (
      name.length > 0 &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password2.length > 0
    ) {
      resetWarningMessages();
      return true;
    } else {
      addWarningMessage('All fields must be filled');
      return false;
    }
  }

  function passwordMustMatch(): boolean {
    if (password === password2) {
      resetWarningMessages();
      return true;
    } else {
      addWarningMessage('Both passwords must match');
      return false;
    }
  }

  async function registerUser(
    adminObj: IAdminRegistrationFunction
  ): Promise<{
    status_code: number;
    results: {};
    errors: string[];
  }> {
    return post(`${process.env.API_ENDPOINT}/admins/auth/register`, adminObj);
  }

  async function handleSubmitRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetWarningMessages();
    if (checkValidForm() && passwordMustMatch()) {
      setLoading(true);
      const registrationResponse = await registerUser({
        admin: {
          name,
          username,
          email,
          password,
          password2
        }
      });

      if (registrationResponse.status_code === 201) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          handleOpenLoginForm();
        }, 5000);
      } else {
        setLoading(false);
        registrationResponse.errors.forEach((error) => {
          addWarningMessage(error);
        });
      }
    }
  }

  return (
    <>
      <Background onClick={() => handleToggleRegisterForm()} />
      <FormDiv>
        <Heading>| Register</Heading>
        {loading ? (
          <Loading>
            <FaSpinner />
          </Loading>
        ) : (
          <>
            {success ? (
              <p>You have successfully registered.</p>
            ) : (
              <Form onSubmit={(e) => handleSubmitRegister(e)}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => onChangeName(e)}
                />
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => onChangeUsername(e)}
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => onChangeEmail(e)}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                />
                <Label htmlFor="password2">Confirm Password</Label>
                <Input
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => onChangePassword2(e)}
                />
                <Submit type="submit">Register</Submit>
                <Warnings
                  warning={app.warnings.length > 0}
                  warningMessages={app.warnings}
                />
                <Button
                  type="button"
                  onClick={() => handleOpenResetPasswordForm()}
                >
                  Reset Password
                </Button>
                <Button type="button" onClick={() => handleOpenLoginForm()}>
                  Already have an account?
                </Button>
              </Form>
            )}
          </>
        )}
      </FormDiv>
    </>
  );
};

RegisterForm.propTypes = {
  handleOpenLoginForm: PropTypes.func.isRequired,
  handleOpenResetPasswordForm: PropTypes.func.isRequired,
  handleToggleRegisterForm: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(RegisterForm);
