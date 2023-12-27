import Footer from "@/components/Footer";
import Nav from "@/components/navbar/NavLayout";
import Head from "next/head";
import { Container } from "react-bootstrap";
import StartupForm from "../forms/startupForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StartupPortal() {
  return (
    <>
      <div>
        <Nav />
        <Container fluid className="body">
          <StartupForm />
        </Container>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}
