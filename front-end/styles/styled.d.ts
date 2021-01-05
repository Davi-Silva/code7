import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;

    background: string;
    text: string;

    borderColor: string;
    containerBackground: string;
    button: {
      delele: string;
      color: string;
    };
    settings: {
      color: string;
    };
    debtStatament: {
      color: string;
      borderColor: string;
    };
  }
}
