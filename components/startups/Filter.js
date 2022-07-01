import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const Filter = (props) => {
  return (
    <>
      <Row>
        <h2>
          Filter out the results <FaFilter className="filter-icon"></FaFilter>
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
              value={props.val1}
              htmlFor="domain"
              onChange={props.change1}
              onClick={props.click1}
            />
            <label htmlFor="agritech"> Agritech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="fintech"
              name="fintech"
              value={props.val2}
              htmlFor="domain"
              onChange={props.change2}
              onClick={props.click2}
            />
            <label htmlFor="fintech"> Fintech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="ecommerce"
              name="ecommerce"
              value={props.val3}
              onChange={props.change3}
              onClick={props.click3}
            />
            <label htmlFor="ecommerce">  E-Commerce</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="edtech"
              name="edtech"
              value={props.val4}
              onChange={props.change4}
              onClick={props.click4}
            />
            <label htmlFor="edtech"> Edtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="adtech"
              name="adtech"
              value={props.val5}
              onChange={props.change5}
              onClick={props.click5}
            />
            <label htmlFor="adtech"> Adtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="traveltech"
              name="traveltech"
              value={props.val6}
              onChange={props.change6}
              onClick={props.click6}
            />
            <label htmlFor="adtech"> Traveltech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="electricvehicles"
              name="electricvehicles"
              value={props.val7}
              onChange={props.change7}
              onClick={props.click7}
            />
            <label htmlFor="adtech"> Electric Vehicles</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="healthtech"
              name="healthtech"
              value={props.val8}
              onChange={props.change8}
              onClick={props.click8}
            />
            <label htmlFor="adtech"> Healthtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="itsector"
              name="itsector"
              value={props.val9}
              onChange={props.change9}
              onClick={props.click9}
            />
            <label htmlFor="adtech"> IT Sector</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="logistics"
              name="logistics"
              value={props.val10}
              onChange={props.change10}
              onClick={props.click10}
            />
            <label htmlFor="adtech"> Logistics</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="retail"
              name="retail"
              value={props.val11}
              onChange={props.change11}
              onClick={props.click11}
            />
            <label htmlFor="adtech"> Retail</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="startupecosystem"
              name="startupecosystem"
              value={props.val12}
              onChange={props.change12}
              onClick={props.click12}
            />
            <label htmlFor="adtech"> Startup Ecosystem</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="enterprisetech"
              name="enterprisetech"
              value={props.val13}
              onChange={props.change13}
              onClick={props.click13}
            />
            <label htmlFor="adtech"> Enterprisetech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="consultancyservices"
              name="consultancyservices"
              value={props.val14}
              onChange={props.change14}
              onClick={props.click14}
            />
            <label htmlFor="adtech"> Consultancy Services</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="insurtech"
              name="insurtech"
              value={props.val15}
              onChange={props.change15}
              onClick={props.click15}
            />
            <label htmlFor="adtech"> Insurtech</label>
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
