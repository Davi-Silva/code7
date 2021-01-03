import React, { useEffect, useState } from 'react';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import Layout from '../components/Layout';

import createStore from '../store';

import themes from '../styles/themes';

const MyApp = ({ Component, pageProps, store }) => {
  const [theme, setTheme] = useState<DefaultTheme>(themes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  const { store } = ctx;

  return { pageProps, store };
};

export default withRedux(createStore)(withReduxSaga(MyApp));
