import React from "react";
import { BsSearch } from "react-icons/bs";
export const SearchOffcanvas = () => {
  return (
    <>
      <BsSearch
        fontSize="2rem"
        id="search-button"
        // className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></BsSearch>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="d-flex">
            <input
              className="form-control me-2 search-offcanvas"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export const Search = () => {
  return (
    <input
      className="form-control me-2 search"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
  );
};
