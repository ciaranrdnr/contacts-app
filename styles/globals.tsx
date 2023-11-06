import { css } from "@emotion/react";

export const globalStyles = css`
  body {
    font-family: "Roboto", sans-serif;
  }
`;
export const mainStyles = css`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

`;
