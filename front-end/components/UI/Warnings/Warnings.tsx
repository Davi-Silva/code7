import React, { FC } from 'react';

import {
  WarningList,
  Warning
} from '../../../styles/components/UI/Modals/LoginForm/LoginForm';

interface IWarningsProps {
  warning: boolean;
  warningMessages: string[];
}

const Warnings: FC<IWarningsProps> = (props) => {
  const { warning, warningMessages } = props;

  return (
    <>
      {warning && warningMessages.length > 0 && (
        <WarningList>
          <h3>Errors:</h3>
          <ul>
            {warningMessages.map((msg) => (
              <Warning>
                <p>{msg}</p>
              </Warning>
            ))}
          </ul>
        </WarningList>
      )}
    </>
  );
};

export default Warnings;
