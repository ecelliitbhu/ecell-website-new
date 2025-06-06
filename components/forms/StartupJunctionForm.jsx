import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable, } from "firebase/storage";
import { firestoreDB,StorageDB } from "@/lib/firebase";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";

export default function StartupJunctionForm() {
 
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const uploadFileToFirebaseStorage = async (file, folderName, fileName) => {
    try {
      const storage = getStorage();
      const storageRef = ref(StorageDB, `StartupJunction/${folderName}/${fileName}`);
       await uploadBytesResumable(storageRef, file);
    } catch (error) {
      console.error("Error uploading file to Firebase Storage:", error);
      throw error;
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const customDocId = data.fullname + data.phoneNumber;
      
      const docRef = doc(firestoreDB, "StartupJunction", customDocId);
      await uploadFileToFirebaseStorage(data.pitchDeck[0], customDocId,"pitchDeck");
      await uploadFileToFirebaseStorage(data.shareholder[0], customDocId,"Shareholder Agreement");
      if (data.moa[0]){
        await uploadFileToFirebaseStorage(data.moa[0], customDocId,"moa");
      }
      if(data.aoa[0]) {
        await uploadFileToFirebaseStorage(data.aoa[0], customDocId, "aoa");
      }
      await uploadFileToFirebaseStorage(data.businessplan[0], customDocId,"businessplan");
      await uploadFileToFirebaseStorage(data.companyincorporation[0], customDocId,"companyincorporation");
      if(data.certificate[0]) {
        await uploadFileToFirebaseStorage(data.certificate[0], customDocId, "certificate of recognition from the Government body");
      }
      await uploadFileToFirebaseStorage(data.cinnumber[0], customDocId,"cinnumber");
      await setDoc(docRef, {
        name:data.fullname,
        phone:data.phoneNumber,
        email:data.email,
        city:data.city,
        info:data.info,
        timestamp: serverTimestamp(),
      });
      toast.success("Form submitted successfully!");
     
      reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error(error.message);
    }
    finally {
      setIsLoading(false); // Hide loading state
    }
  };
  return (
    <div className={"form-card"}>
      <div className={"form-card-content"}>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className={"name-email"}>
            <Form.Group className="mb-3" controlId="Fullname">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Full Name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Founder name"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span style={{ color: "red" }}>
                  Please provide your full name
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                Email address<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@itbhu.ac.in"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  Please provide your  email
                </span>
              )}
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="PhoneNumber">
            <Form.Label>
              Phone Number<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="9999888877"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span style={{ color: "red" }}>
                Please provide your phone number
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="City">
            <Form.Label>
             Preferred City <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              placeholder="Open this select preferred city"
              {...register("city", { required: true })}
            >
              <option>Open this select preferred city</option>
              <option value="Pune">Pune</option>
              <option value="Banglore">Banglore</option>

            </Form.Select>
            {errors.city && (
              <span style={{ color: "red" }}>Please select preferred city</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="PitchDeck">
            <Form.Label>
              Pitch Deck (Must include: Traction, Revenue generated, Information about the prev funding rounds and ask)<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="file"
              {...register("pitchDeck", { required: true })}
            />
            {errors.pitchDeck && (
              <span style={{ color: "red" }}>
                Please provide your Pitch Deck
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Shareholder">
            <Form.Label>
              Shareholder Agreement
            </Form.Label>
            <Form.Control
              type="file"
              {...register("shareholder")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="moa">
            <Form.Label>
              MOA (Memorandum of Association)
            </Form.Label>
            <Form.Control
              type="file"
              {...register("moa")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Aoa">
            <Form.Label>
              AOA (Articles of Association)
            </Form.Label>
            <Form.Control
              type="file"
              {...register("aoa")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="businessplan">
            <Form.Label>
              Business Plan
            </Form.Label>
            <Form.Control
              type="file"
              {...register("businessplan", )}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="companyincorporation">
            <Form.Label>
              Company Incorporation
            </Form.Label>
            <Form.Control
              type="file"
              {...register("companyincorporation", )}
            />
            {/*{errors.companyincorporation && (*/}
            {/*  <span style={{ color: "red" }}>*/}
            {/*    Please provide your Company Incorporation*/}
            {/*  </span>*/}
            {/*)}*/}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Certificate">
            <Form.Label>
              Certificates of recognition from the Government body
            </Form.Label>
            <Form.Control
              type="file"
              {...register("certificate")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Cinnumber">
            <Form.Label>
              CIN Number
            </Form.Label>
            <Form.Control
              type="file"
              {...register("cinnumber",)}
            />
            {/*{errors.cinnumber && (*/}
            {/*  <span>*/}
            {/*    Please provide your CIN Number*/}
            {/*  </span>*/}
            {/*)}*/}
          </Form.Group>
          <Form.Group className="mb-3" controlId="info">
            <Form.Label style={{ fontSize: "1.2rem" }}>
              How do you got to know about this?
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Like Instagram/WhatsApp"
              {...register("info")}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <Button variant="primary" type={"submit"} size="lg">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
