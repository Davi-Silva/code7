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
  }
}
