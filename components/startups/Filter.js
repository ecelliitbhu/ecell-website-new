import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const Filter = (props) => {
  const { agritechf, fintechf, ecommercef, edtechf, adtechf, traveltechf, electricvehiclesf, healthtechf, itsectorf, logisticsf, retailf, startupecosystemf, enterprisetechf, consultancyservicesf, insurtechf } = props
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
              value="agritech"
              htmlFor="domain"
              onClick={() => { agritechf() }}
            />
            <label htmlFor="agritech"> Agritech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="fintech"
              name="fintech"
              value="fintech"
              htmlFor="domain"
              onClick={() => { fintechf() }}
            />
            <label htmlFor="fintech"> Fintech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="ecommerce"
              name="ecommerce"
              value="ecommerce"
              onClick={() => { ecommercef() }}
            />
            <label htmlFor="ecommerce">  E-Commerce</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="edtech"
              name="edtech"
              value="edtech"
              onClick={() => { edtechf() }}
            />
            <label htmlFor="edtech"> Edtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="adtech"
              name="adtech"
              value="adtech"
              onClick={() => { adtechf() }}
            />
            <label htmlFor="adtech"> Adtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="traveltech"
              name="traveltech"
              value="traveltech"
              onClick={() => { traveltechf() }}
            />
            <label htmlFor="traveltech"> Traveltech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="electricvehicles"
              name="electricvehicles"
              value="electricvehicles"
              onClick={() => { electricvehiclesf() }}
            />
            <label htmlFor="electricvehicles"> Electric Vehicles</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="healthtech"
              name="healthtech"
              value="healthtech"
              onClick={() => { healthtechf() }}
            />
            <label htmlFor="healthtech"> Healthtech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="itsector"
              name="itsector"
              value="itsector"
              onClick={() => { itsectorf() }}
            />
            <label htmlFor="itsector"> IT Sector</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="logistics"
              name="logistics"
              value="logistics"
              onClick={() => { logisticsf() }}
            />
            <label htmlFor="logistics"> Logistics</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="retail"
              name="retail"
              value="retail"
              onClick={() => { retailf() }}
            />
            <label htmlFor="retail"> Retail</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="startupecosystem"
              name="startupecosystem"
              value="startupecosystem"
              onClick={() => { startupecosystemf() }}
            />
            <label htmlFor="startupecosystem"> Startup Ecosystem</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="enterprisetech"
              name="enterprisetech"
              value="enterprisetech"
              onClick={() => { enterprisetechf() }}
            />
            <label htmlFor="enterprisetech"> Enterprisetech</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="consultancyservices"
              name="consultancyservices"
              value="consultancyservices"
              onClick={() => { consultancyservicesf() }}
            />
            <label htmlFor="consultancyservices"> Consultancy Services</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="insurtech"
              name="insurtech"
              value="insurtech"
              onClick={() => { insurtechf() }}
            />
            <label htmlFor="insurtech"> Insurtech</label>
          </li>
        </ul>
      </Row>
      <Row className="filter-subcontainer">
        <h3>Founded in</h3>
        <ul>
          <li>
            <input type="checkbox" id="before 2000" name="before 2000" value="before 2000" />
            <label htmlFor="before 2000"> Before 2000</label>
          </li>
          <li>
            <input type="checkbox" id="2000-2005" name="2000-2005" value="2000-2005" />
            <label htmlFor="2000-2005"> 2000-2005</label>
          </li>
          <li>
            <input type="checkbox" id="2005-2010" name="2005-2010" value="2005-2010" />
            <label htmlFor="2005-2010"> 2005-2010</label>
          </li>
          <li>
            <input type="checkbox" id="2010-2015" name="2010-2015" value="2010-2015" />
            <label htmlFor="2010-2015"> 2010-2015</label>
          </li>
          <li>
            <input type="checkbox" id="2015-2020" name="2015-2020" value="2015-2020" />
            <label htmlFor="2015-2020"> 2015-2020</label>
          </li>
          <li>
            <input type="checkbox" id="after 2020" name="after 2020" value="after 2020" />
            <label htmlFor="after 2020"> After 2020</label>
          </li>
        </ul>
      </Row>
    </>
  );
};

export default Filter;
