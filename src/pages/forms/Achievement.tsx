import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput, VerticalForm } from "../../components";

interface achievement {
  _id: string;
  Goldmedal: string;
  silverMedal: string;
  bronzeMedal: string;
}

const NormalFormValidation = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [achievementData, setAchievementData] = useState<achievement[]>([]);
  const [Goldmedal, setGoldmedal] = useState("");
  const [silverMedal, setSilverMedal] = useState("");
  const [bronzeMedal, setBronzeMedal] = useState("");
  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // const addGallery = async(event: React.FormEvent<HTMLFormElement>)=>{
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //     }
  //     else{
  //         event.preventDefault();
  //         const formData = new FormData()
  //         formData.append('Goldmedal', Goldmedal);
  //         formData.append('silverMedal', silverMedal);
  //         formData.append('bronzeMedal', bronzeMedal);
  //         console.log('formData-------,', formData);
  //         try {
  //             const response = await fetch(`http://165.22.219.69:5002/api/achievement`, {
  //                 method: 'POST',
  //                 body: formData,
  //             });
  //             if (!response.ok) {
  //                 throw new Error(`HTTP error! Status: ${response.status}`);
  //             }
  //             // Assuming you want to parse the JSON response
  //             const data = await response.json();
  //             alert( formData)
  //             console.log("data get -----------", data)
  //         } catch (error) {
  //             console.error('Error during edit the achievement:', error);
  //         }
  //     }
  //     setValidated(true);
  // }

  const addGallery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("Goldmedal", Goldmedal);
      formData.append("silverMedal", silverMedal);
      formData.append("bronzeMedal", bronzeMedal);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/achievement`,
          {
            method: "POST",
            body: formData, // Send the FormData object directly
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming you want to parse the JSON response
        const data = await response.json();
        alert("Data submitted successfully!"); // Alert a success message
      } catch (error) {
        console.error("Error during edit the achievement:", error);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form style={{ width: "100%" }} onSubmit={addGallery}>
            <h1>Add Rising Start of Bihar</h1>
            {/* <> */}
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Gold Medal</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Gold Medal"
                defaultValue=""
                onChange={(e) => setGoldmedal(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Silver Medal</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Player's Game"
                defaultValue=""
                onChange={(e) => setSilverMedal(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Bronze Medal</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Bronze Medal "
                defaultValue=""
                onChange={(e) => setBronzeMedal(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add image</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

const FormValidation = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forms", path: "/forms/gallery" },
          { label: "Validation", path: "/forms/gallery", active: true },
        ]}
        title={"Rising star of Bihar Section"}
      />
      <Row>
        <Col lg={10}>
          <NormalFormValidation />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
