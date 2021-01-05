import React, { useState, FC, ChangeEvent, FormEvent } from 'react';

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

interface ResetPasswordFormProps {
  handleOpenLoginForm: () => void;
  handleToggleResetPasswordForm: () => void;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  handleOpenLoginForm,
  handleToggleResetPasswordForm
}) => {
  const [email, setEmail] = useState<string>('');

  const [warning, setWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const checkValidForm = () => {
    if (email.length > 0) {
      setWarning(false);
      setWarningMessage('');
      return true;
    } else {
      setWarning(true);
      setWarningMessage('All fields must be filled');
      return false;
    }
  };

  const handleSubmitResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkValidForm()) {
      console.log(email);
    }
  };

  return (
    <>
      <Background onClick={() => handleToggleResetPasswordForm()} />
      <FormDiv>
        <Heading>| Reset Password</Heading>
        <Form
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            handleSubmitResetPassword(e)
          }
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e)}
          />
          <Submit type="submit">Reset Password</Submit>
          {warning && warningMessage.length > 0 && (
            <Warning>{warningMessage}</Warning>
          )}
          <Button type="button" onClick={() => handleOpenLoginForm()}>
            Already have an account?
          </Button>
        </Form>
      </FormDiv>
    </>
  );
};

export default ResetPasswordForm;
