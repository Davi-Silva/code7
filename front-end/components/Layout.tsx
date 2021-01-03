import React, { useState, useEffect, useLayoutEffect, FC } from 'react';
import { connect, useDispatch } from 'react-redux';

import NavigationBar from './UI/NavigationBar/NavigationBar';
import Footer from './UI/Footer/Footer';

import { IStateProps } from '../interfaces/components/Layout';

import { LayoutDiv } from '../styles/components/Layout';

import { decodeAccessToken } from '../store/actions/user/user';
import { getDimensions, setIsMobile } from '../store/actions/app/app';

import GlobalStyle from '../styles/global';

let count: number = 0;

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const mapStateToProps = (state: IStateProps) => {
  const { admin, app, navbar } = state;

  return {
    admin,
    app,
    navbar
  };
};

const Layout: FC<IStateProps> = ({ children, admin, app, navbar }) => {
  const dispatch = useDispatch();

  dispatch(getDimensions(useWindowSize()));

  useEffect(() => {
    if (count === 0) {
      dispatch(decodeAccessToken());
      count += 1;
    }
  }, []);

  useEffect(() => {
    if (app.dimensions[0] <= 670) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [app.dimensions]);

  return (
    <>
      <GlobalStyle />
      <NavigationBar />
      <LayoutDiv>{children}</LayoutDiv>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps)(Layout);
