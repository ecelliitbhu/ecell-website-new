import { Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "./Filter";
const FilterOffcanvas = ({
  domainFiltersList,
  setDomainFiltersList,
  foundedInFiltersList,
  setFoundedInFiltersList,
}) => {
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
          </Row>
          <Filter
            domainFiltersList={domainFiltersList}
            setDomainFiltersList={setDomainFiltersList}
            foundedInFiltersList={foundedInFiltersList}
            setFoundedInFiltersList={setFoundedInFiltersList}
          />
        </Col>
      </Drawer>
    </>
  );
};

export default FilterOffcanvas;
