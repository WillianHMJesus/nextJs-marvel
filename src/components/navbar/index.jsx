import { useState } from "react";

export default function NavBar({ showForm, handleSearchData }) {
  const [value, setValue] = useState('');

  return (
    <>
      <nav className="navbar bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand">
            <img src="/marvel-logo.svg" width="60" height="30" className="d-inline-block align-top" alt="Marvel logo" />
          </a>
          {showForm && <div className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              value={value} onChange={(event) => setValue(event.target.value)} />
            <button className="btn btn-outline-light" onClick={() => handleSearchData(value)}>Search</button>
          </div>}
        </div>
      </nav>
    </>
  )
}