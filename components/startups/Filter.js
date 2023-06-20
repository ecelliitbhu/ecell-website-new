import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const domainFilterItems = [
  "agritech",
  "fintech",
  "e-commerce",
  "edtech",
  "adtech",
];

const foundedInFilterItems = [
  {
    start: 2019,
    end: 2022,
  },
  {
    start: 2015,
    end: 2019,
  },
  {
    start: 2010,
    end: 2015,
  },
  {
    start: 0,
    end: 2010,
  },
];
const DomainInput = ({ name, domainFiltersList, setDomainFiltersList }) => {
  const isOkay = domainFiltersList.includes(name);
  const [isChecked, setIsChecked] = useState(isOkay);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (isChecked) {
      setDomainFiltersList([...domainFiltersList, name]);
    } else {
      setDomainFiltersList(domainFiltersList.filter((item) => item !== name));
    }
  }, [domainFiltersList, isChecked, name, setDomainFiltersList]);
  return (
    <li className="domain-input-container">
      <input
        type="checkbox"
        name={name}
        value={name}
        checked={isChecked}
        onChange={handleOnChange}
        htmlFor="domain"
      />
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </li>
  );
};
const FoundedInInput = ({
  duration,
  foundedInFiltersList,
  setFoundedInFiltersList,
}) => {
  const isOkay = foundedInFiltersList.includes(duration);
  const [isChecked, setIsChecked] = useState(isOkay);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (isChecked) {
      setFoundedInFiltersList([...foundedInFiltersList, duration]);
    } else {
      setFoundedInFiltersList(
        foundedInFiltersList.filter((item) => item !== duration)
      );
    }
  }, [duration, foundedInFiltersList, isChecked, setFoundedInFiltersList]);
  const name =
    duration.start > 0
      ? duration.start + "-" + duration.end
      : "before " + duration.end;
  return (
    <li className="domain-input-container">
      <input
        type="checkbox"
        checked={isChecked}
        name={name}
        value={name}
        onChange={handleOnChange}
        htmlFor="foundedin"
      />
      <label htmlFor={name}>{name}</label>
    </li>
  );
};
const Filter = ({
  domainFiltersList,
  setDomainFiltersList,
  foundedInFiltersList,
  setFoundedInFiltersList,
}) => {
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
          {domainFilterItems.map((item, id) => {
            return (
              <DomainInput
                key={id}
                name={item}
                domainFiltersList={domainFiltersList}
                setDomainFiltersList={setDomainFiltersList}
              />
            );
          })}
        </ul>
      </Row>
      <Row className="filter-subcontainer">
        <h3>Founded in</h3>
        <ul>
          {foundedInFilterItems.map((item, id) => {
            return (
              <FoundedInInput
                key={id}
                duration={item}
                foundedInFiltersList={foundedInFiltersList}
                setFoundedInFiltersList={setFoundedInFiltersList}
              />
            );
          })}
        </ul>
      </Row>
    </>
  );
};

export default Filter;
