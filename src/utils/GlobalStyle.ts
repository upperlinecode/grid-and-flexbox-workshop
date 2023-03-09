import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "IBM Plex Sans",sans-serif;
  }

  .ReactModal__Overlay {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .ReactModal__Content {
    background-color: rgb(220, 220, 220) !important;
    inset: unset !important;
    max-height: 100vh - 40px;
    max-width: 100vw - 40px;
    min-height: 200px;
    min-width: 400px;
    position: relative;
  }
`;
