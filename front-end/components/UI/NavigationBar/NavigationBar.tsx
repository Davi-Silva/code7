import React, { FC } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import { FaBars } from 'react-icons/fa';

import { IStateProps } from '../../../interfaces/components/Layout';

import {
  NavigationBarDiv,
  Container,
  BrandA,
  LoginBtn
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
  return (
    <NavigationBarDiv>
      <Container>
        <BrandA>Code7</BrandA>
        <div>
          <LoginBtn>Login</LoginBtn>
        </div>
      </Container>
    </NavigationBarDiv>
  );
};

export default connect(mapStateToProps)(NavigationBar);
