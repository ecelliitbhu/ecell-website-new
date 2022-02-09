import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const Filter = () => {
  return (
    <>
      <Row>
        <h2>
          Filter out the results <FaFilter classNameName="filter-icon"></FaFilter>
        </h2>
      </Row>
      <Row className="filter-subcontainer">
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
              id="fintech"
              name="fintech"
              value="fintech"
            />
            <label htmlFor="fintech"> Fintech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="ecommerce"
              name="ecommerce"
              value="ecommerce"
            />
            <label htmlFor="ecommerce">  E-Commerce</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="edtech"
              name="edtech"
              value="edtech"
            />
            <label htmlFor="edtech"> Edtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="adtech"
              name="adtech"
              value="adtech"
            />
            <label htmlFor="adtech"> Adtech</label>
          </li>
        </ul>
      </Row>
      <Row className="filter-subcontainer">
        <h3>Founded in</h3>
        <ul>
          <li>
            <input type="checkbox" id="2019-2022" name="2019-2022" value="2019-2022" />
            <label htmlFor="2019-2022"> 2019-2022</label>
          </li>
          <li>
            <input type="checkbox" id="2015-2019" name="2015-2019" value="2015-2019" />
            <label htmlFor="2015-2019"> 2015-2019</label>
          </li>
          <li>
            <input type="checkbox" id="2010-2015" name="2010-2015" value="2010-2015" />
            <label htmlFor="2010-2015"> 2010-2015</label>
          </li>
          <li>
            <input type="checkbox" id="Before 2010" name="Before 2010" value="Before 2010" />
            <label htmlFor="Before 2010"> Before 2010</label>
          </li>
        </ul>
      </Row>
    </>
  );
};

export default Filter;
