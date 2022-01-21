import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const Filter = () => {
  return (
    <Col class="filter-container">
      <Row>
        <h2>
          Filter out the results <FaFilter className="filter-icon"></FaFilter>
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
            <input type="checkbox" id="active" name="active" value="active" />
            <label htmlFor="active"> Active</label>
          </li>
          <li>
            <input type="checkbox" id="active" name="active" value="active" />
            <label htmlFor="active"> Active</label>
          </li>
          <li>
            <input type="checkbox" id="active" name="active" value="active" />
            <label htmlFor="active"> Active</label>
          </li>
          <li>
            <input type="checkbox" id="active" name="active" value="active" />
            <label htmlFor="active"> Active</label>
          </li>
        </ul>
      </Row>
    </Col>
  );
};

export default Filter;
