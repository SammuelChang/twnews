import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    padding: none;
    margin: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    border: none;
    outline: none;
    display: block;
  }
`;
 
export default GlobalStyle;