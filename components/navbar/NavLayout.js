import { Discover, Initiatives, Learn, Connect } from "./NavItems";
import { Login, SignUp } from "./NavButtons";
import { SearchOffcanvas, Search } from "./NavSearch";
import { NavToggle } from "./NavToggle";
import { NavLogo } from "./NavLogo";


const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLogo/>
          <NavToggle/>
          <SearchOffcanvas/>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Discover/>
              <Initiatives/>
              <Connect/>
              <Learn/>
              <form className="d-flex">
                <Search/>
              </form>
              <div className="buttons">
                <Login/>
                <SignUp/>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
