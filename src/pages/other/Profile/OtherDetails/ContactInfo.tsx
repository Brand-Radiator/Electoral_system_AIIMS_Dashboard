import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";

interface ContactInformation {
  mobileNumber: string;
  emailid: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface ContactInfoProps {
  item: ContactInformation;
  handleContactInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ContactInformation
  ) => Promise<void>;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInformation>>;
  isApiHit: boolean;
}

const ContactInfo = ({
  item,
  handleContactInfoSubmit,
  setContactInfo,
  isApiHit,
}: ContactInfoProps) => {
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setContactInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else {
      // If the input type is not a file, update the state as usual
      setContactInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const isValidZipCode = (zip: any) => /^\d{6}$/.test(zip);
  // Add additional validation checks as needed
  const isFormValid = () => {
    return isValidZipCode(item?.zip);
    // &&
    // Add other validation checks for different fields if needed
    // item?.mobileNumber &&
    // item?.emailid &&
    // item?.country &&
    // item?.state &&
    // item?.city
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleContactInfoSubmit(e, item)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Mobile Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter your number"
                  value={item?.mobileNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Email id <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="emailid"
                  placeholder="Enter Email id"
                  value={item?.emailid}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              {/*
              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Country <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  value={item?.country}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  State <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  required
                  placeholder="Enter state"
                  value={item?.state}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  City <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  required
                  placeholder="Enter city"
                  value={item?.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Zip-Code
                </Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  placeholder="Enter 6 digit zip-code"
                  value={item?.zip}
                  onChange={handleChange}
                  isInvalid={!isValidZipCode(item?.zip)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 6-digit zip code.
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isApiHit}
                >
                  {isApiHit ? "Saving" : "Save"}
                </Button>

                {/* <Button variant="secondary" type="reset">
                  Cancel
                </Button> */}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ContactInfo;
