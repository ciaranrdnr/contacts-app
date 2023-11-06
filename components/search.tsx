/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import { css, useTheme } from "@emotion/react";
import { SearchStyled } from "@/styles/contact-list";

interface ISearchProps {
  onSearch: (e: string) => void;
}
const Search = ({ onSearch }: ISearchProps) => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
    }
  };
  const iconStyle = css`
    color: ${theme.colors.NN200}; // Use your theme color here
  `;

  return (
    <SearchStyled>
      <FaSistrix css={iconStyle} />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Cari Kontak"
        css={css`
          border: none;
          padding-left: 8px;
          outline: none;
        `}
      />
    </SearchStyled>
  );
};

export default Search;
