import { Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
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
      <Button style={{ height: "40px" }} onClick={toggleDrawer("left", true)}>
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
            <IoIosCloseCircleOutline
              style={{
                position: "relative",
                left: "130px",
                marginBottom: "20px",
                fontSize: "35px",
              }}
              onClick={toggleDrawer("left", false)}
            ></IoIosCloseCircleOutline>

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
            <h3>Founded in</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="2019-2022"
                  name="2019-2022"
                  value="2019-2022"
                />
                <label htmlFor="2019-2022"> 2019-2022</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="2015-2019"
                  name="2015-2019"
                  value="2015-2019"
                />
                <label htmlFor="2015-2019"> 2015-2019</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="2010-2015"
                  name="2010-2015"
                  value="2010-2015"
                />
                <label htmlFor="2010-2015"> 2010-2015</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="Before 2010"
                  name="Before 2010"
                  value="Before 2010"
                />
                <label htmlFor="Before 2010"> Before 2010</label>
              </li>
            </ul>
          </Row>
        </Col>
      </Drawer>
    </>
  );
};

export default FilterOffcanvas;
