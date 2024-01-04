import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Nav from "@/components/navbar/NavLayout";
import Head from "next/head";
import { Container } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { StartupDetailsModal } from "./modal";
import { getDataFromStartupModal } from "../forms/databaseInteractions";

export default function StudentPortal() {
  const [startupData, setStartupData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [hiringProfilesString, setHiringProfilesString] = useState("");
  const [applicableCandidatesString, setApplicableCandidatesString] =
    useState("");

  useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      console.log("chal gaya");
      try {
        const fetchedData = await getDataFromStartupModal();

        const updatedStartupData = [];
        fetchedData.forEach((dt) => {
          // Add dt.id to dt.data
          const updatedData = { ...dt.data, id: dt.id };
          // Push the updated data to the array
          updatedStartupData.push(updatedData);
        });
        setStartupData(updatedStartupData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the function when the component mounts
    fetchData();
  }, []);

  const handleModal = (data) => {
    setModalData(data);
    const hp = data.hiring_profiles;
    const ac = data.applicable_candidates;

    // Concatenate array elements with "$" separator
    const concatenatedString_hp = hp.join("$");
    const concatenatedString_ac = ac.join("$");

    // Set the result to the state
    setHiringProfilesString(concatenatedString_hp);
    setApplicableCandidatesString(concatenatedString_ac);

    setModalShow(true);
  };

  return (
    <>
      <div>
        <Nav />
        <Container fluid className="body">
          <CardGroup as={Row} className="mt-4 mb-4">
            {startupData.map((data, index) => (
              <Col
                key={index}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                // style={{ display: "flex", justifyContent: "center" }}
                className="d-flex justify-content-center"
              >
                <Card
                  className="my-2 mx-3 d-flex justify-content-center"
                  style={{
                    maxWidth: "80%",
                    border: "1.8px solid #fa8231",
                    borderRadius: "8px",
                    maxHeight: "18rem",
                  }}
                >
                  <Card.Header style={{ borderBottom: "1.8px solid #fa8231" }}>
                    <Card.Title
                      className="my-auto py-2"
                      style={{ backgroundColor: "#f8f9fa", color: "#4D423E" }}
                    >
                      {data.company_name}
                    </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{
                          flex: 1,
                          padding: "10px",
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                      >
                        <div>Joining Date</div>
                      </div>
                      <div
                        style={{ flex: 1, padding: "10px", fontSize: "1rem" }}
                      >
                        <div>{data.joining_date}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{
                          flex: 1,
                          padding: "10px",
                          fontSize: "1.1rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                      >
                        <div>Stipend</div>
                      </div>
                      <div
                        style={{ flex: 1, padding: "10px", fontSize: "1rem" }}
                      >
                        <div>{data.stipend} $</div>
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer style={{ borderTop: "1.8px solid #fa8231" }}>
                    <Row
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col>
                        <div className="text-muted">{data.loc}</div>
                      </Col>

                      <Col style={{ textAlign: "end" }}>
                        <Button
                          variant=""
                          style={{ backgroundColor: "#fa8231", color: "white" }}
                          onClick={() => handleModal(data)}
                        >
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </CardGroup>
        </Container>
        <Footer />
      </div>

      <StartupDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={modalData}
        hiringProfilesString={hiringProfilesString}
        applicableCandidatesString={applicableCandidatesString}
      />
    </>
  );
}
