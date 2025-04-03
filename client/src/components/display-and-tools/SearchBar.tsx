import "./search-bar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchedValue, setSearchedValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchedValue)}`);
  };

  const handleChangeSearchForm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchedValue(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <label className="skip-link" htmlFor="search">
        {" "}
        Rechercher une technique
      </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Rechercher une technique "
        value={searchedValue}
        onChange={handleChangeSearchForm}
      />
      <button type="submit">
        <img id="search-bar-icon" src="/9.png" alt="loupe" />
      </button>
    </form>
  );
}
