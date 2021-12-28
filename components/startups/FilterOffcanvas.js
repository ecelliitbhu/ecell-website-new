import { Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
const FilterOffcanvas = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Button style={{ height: "40px"}} onClick={toggleDrawer("left", true)}>
        Filters <FaFilter className="filter-icon"></FaFilter>
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        className="offcanvas-container"
      >
        <Col class="filter-container" style={{ padding: "30px" }}>
          <Row>
            <CloseIcon style={{position:"relative", left:"140px", marginBottom:"20px", fontSize:"2rem"}} onClick={toggleDrawer("left", false)}></CloseIcon>

            <h2>
              Filter out the results{" "}
              <FaFilter className="filter-icon"></FaFilter>
            </h2>
          </Row>
          <Row class="filter-subcontainer">
            <h3>Domains</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="agritech"
                  name="agritech"
                  value="agritech"
                />
                <label htmlFor="agritech"> Agritech</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agritech"
                  name="agritech"
                  value="agritech"
                />
                <label htmlFor="agritech"> Agritech</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agritech"
                  name="agritech"
                  value="agritech"
                />
                <label htmlFor="agritech"> Agritech</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agritech"
                  name="agritech"
                  value="agritech"
                />
                <label htmlFor="agritech"> Agritech</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agritech"
                  name="agritech"
                  value="agritech"
                />
                <label htmlFor="agritech"> Agritech</label>
              </li>
            </ul>
          </Row>
          <Row class="filter-subcontainer">
            <h3>Year of graduation</h3>
            <ul>
              <li>
                <input type="checkbox" id="2006" name="2006" value="2006" />
                <label htmlFor="2006"> 2006</label>
              </li>
              <li>
                <input type="checkbox" id="2006" name="2006" value="2006" />
                <label htmlFor="2006"> 2006</label>
              </li>
              <li>
                <input type="checkbox" id="2006" name="2006" value="2006" />
                <label htmlFor="2006"> 2006</label>
              </li>
              <li>
                <input type="checkbox" id="2006" name="2006" value="2006" />
                <label htmlFor="2006"> 2006</label>
              </li>
              <li>
                <input type="checkbox" id="2006" name="2006" value="2006" />
                <label htmlFor="2006"> 2006</label>
              </li>
            </ul>
          </Row>
          <Row class="filter-subcontainer">
            <h3>Status</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  value="active"
                />
                <label htmlFor="active"> Active</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  value="active"
                />
                <label htmlFor="active"> Active</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  value="active"
                />
                <label htmlFor="active"> Active</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  value="active"
                />
                <label htmlFor="active"> Active</label>
              </li>
            </ul>
          </Row>
        </Col>
      </Drawer>
    </>
  );
};

export default FilterOffcanvas;
