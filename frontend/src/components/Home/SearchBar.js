import React from "react";

const SearchBar = ({ title, setTitle }) => {
    return (
    <input
      id="search-box"
      placeholder="What is it that you truly desire?"
      type="search"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    ></input>
  );
};

export default SearchBar;