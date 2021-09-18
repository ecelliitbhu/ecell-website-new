import {FcApproval} from 'react-icons/fc'
import {FcCollaboration} from 'react-icons/fc'
import {FcAddressBook} from 'react-icons/fc'
import {FcServices} from 'react-icons/fc'

// import styles from "../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg"
            alt="Lottiefiles Logo"
            className="lf-logo lf-logo-dark -mt-1"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown discover">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h3>Discover</h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <ul className="dropdown-container">
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                      <div>
                        <h4>kya hua</h4>
                        <p>
                          ghjs hs hsjh hsjgh <br /> gygss gsgass ghgd ddg dgdh
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                      <div>
                        <h4>Tera wada</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                      <div>
                        <h4>Wo kasam</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                      <div>
                        <h4>Bhul gya</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <ul className="dropdown-subcontainer right-nav-column">
                    <div className="right-nav-column-sub">
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                    </div>
                    <div className="right-nav-column-sub">
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                    </div>
                  </ul>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown design">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h3>Design</h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <ul className="dropdown-container">
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcApproval fontSize="2.2rem"></FcApproval>
                      <div>
                        <h4>kaise Ho</h4>
                        <p>
                          ghjs hs hsjh hsjgh <br /> gygss gsgass ghgd ddg dgdh
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcApproval fontSize="2.2rem"></FcApproval>
                      <div>
                        <h4>Theek hun</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcApproval fontSize="2.2rem"></FcApproval>
                      <div>
                        <h4>Tum Batao</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcApproval fontSize="2.2rem"></FcApproval>
                      <div>
                        <h4>Bohot Dukh hai</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <ul className="dropdown-subcontainer right-nav-column">
                    <div className="right-nav-column-sub">
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                    </div>
                    <div className="right-nav-column-sub">
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          ankjbahjbhkabk
                        </a>
                      </li>
                    </div>
                  </ul>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown code">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h3>Code</h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <ul className="dropdown-container">
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Party dedo</h4>
                        <p>
                          ghjs hs hsjh hsjgh <br /> gygss gsgass ghgd ddg dgdh
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Seniors</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Bohot Saari</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Pending hai</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Mehngi Wali</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                      <div>
                        <h4>Party dena</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown learn">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h3>Learn</h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <ul className="dropdown-container">
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                      <FcServices fontSize="2.2rem"></FcServices>
                      <div>
                        <h4>Despacito</h4>
                        <p>
                          ghjs hs hsjh hsjgh <br /> gygss gsgass ghgd ddg dgdh
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcServices fontSize="2.2rem"></FcServices>
                      <div>
                        <h4>ka lyrics</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-subcontainer">
                    <a className="dropdown-item" href="#">
                    <FcServices fontSize="2.2rem"></FcServices>
                      <div>
                        <h4>yaad kyun</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>

                    <a className="dropdown-item" href="#">
                    <FcServices fontSize="2.2rem"></FcServices>
                      <div>
                        <h4>Nhi hota</h4>
                        <p>
                          Lorem ipsum dolor sit <br /> amet consectetur
                          adipisicing
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <form className="d-flex">
              <input
                className="form-control me-2 search"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <div className="buttons">
              <button
                className="btn btn-outline-success"
                id="login"
                type="submit"
              >
                Login
              </button>
              <button className="btn btn-outline-success" type="submit">
                Sign Up
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
