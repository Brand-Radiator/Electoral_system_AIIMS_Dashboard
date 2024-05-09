import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";

interface PersonalInfo {
  title: string;
  name: string;
  designation: string;
  employeeid: string;
  dob: string;
  doj: string;
  gender: string;
  image: string;
}

interface PersonalInfoProps {
  item: PersonalInfo;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PersonalInfo
  ) => Promise<void>;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  isApiHit: boolean;
}

const PersonalInformation = ({
  item,
  handleSubmit,
  setPersonalInfo,
  isApiHit,
}: PersonalInfoProps) => {
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (e: any) => {
    const { name, value, files, type } = e.target;

    if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setPersonalInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));

      // Preview the image

      // const reader = new FileReader();

      // reader.onload = (e) => {
      //   setPreviewImage(e.target?.result as string);
      // };

      // reader.readAsDataURL(files[0]);
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setPersonalInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file, update the state as usual
      setPersonalInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const regexValidation = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "name":
        return /^[A-Za-z\s.]+$/i.test(value?.trim());
      case "designation":
        return /^[A-Za-z\s.]+$/i.test(value?.trim());
      case "employeeid":
        return /^[A-Za-z0-9]+$/.test(value?.trim());
      // case "dob":
      //   // You may need a more specific date format validation
      //   return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value.trim());
      // case "doj":
      //   // You may need a more specific date format validation
      //   return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value.trim());
      // case "gender":
      //   return /^(Male|Female)$/i.test(value.trim());
      // case "image":
      //   // Allow only JPG, JPEG, and PNG formats
      //   return /\.(jpg|jpeg|png)$/i.test(File[0].trim());
      default:
        return true;
    }
  };

  const validateField = (fieldName: string, value: string) => {
    return regexValidation(fieldName, value);
  };

  const isFormValid = () => {
    const isNameValid = validateField("name", item?.name);
    const isDesignationValid = validateField("designation", item?.designation);
    const isEmployeeIdValid = validateField("employeeid", item?.employeeid);
    // const isDobValid = validateField("dob", item?.dob);
    // const isDojValid = validateField("doj", item?.doj);
    // const isGenderValid = validateField("gender", item?.gender);
    // Add additional validations for other fields as needed

    return (
      isNameValid && isDesignationValid && isEmployeeIdValid
      //  &&
      // isDobValid &&
      // isDojValid &&
      // isGenderValid
      // Add additional validations for other fields as needed
    );
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleSubmit(e, item)}
            >
              <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                <Form.Label>
                  Title<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select name="title" required value={item?.title}>
                  <option value="" disabled>
                    Select Title
                  </option>
                  <option value="Dr">Dr</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Smt">Smt</option>
                  <option value="Shree">Shree</option>
                  <option value="Prof">Prof</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Name <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={item?.name}
                  required
                  onChange={handleChange}
                  isInvalid={!validateField("name", item?.name)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Designation <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  placeholder="Enter Designation"
                  value={item?.designation}
                  required
                  onChange={handleChange}
                  isInvalid={!validateField("designation", item?.designation)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid designation.
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                <Form.Label>
                  Designation<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  name="designation"
                  required
                  value={item?.designation}
                >
                  <option value="" disabled>
                    Select designation
                  </option>
                  <option value="Professor">Professor</option>
                  <option value="Professor Jr. Grade">
                    Professor(Jr. Grade)
                  </option>
                  <option value="Associate professor">
                    Associate professor
                  </option>
                  <option value="Assistant professor">
                    Assistant professor
                  </option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Senior Teacher">Senior Teacher</option>
                  <option value="Junior Teacher">Junior Teacher</option>
                  <option value="Demonstrator">Demonstrator</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  <h5>
                    UPUMS Biometric I'd
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employeeid"
                  placeholder="Enter UPUMS Biometric I'd"
                  value={item?.employeeid}
                  // required
                  onChange={handleChange}
                  isInvalid={!validateField("employeeid", item?.employeeid)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Biometric I'd.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  <h5>Profile image</h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  // isInvalid={!validateField("image", item?.image)}
                />
                {/* {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )} */}
                {item?.image && (
                  <p>
                    Uploaded file:{" "}
                    {typeof item?.image == "string" ? item?.image : ""}
                  </p>
                )}

                {/* {item?.image && typeof item?.image === "string" && (
                  <>
                    <p>Uploaded file: {item?.image}</p>
                    <img
                      src={item?.image}
                      alt="Preview"
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                  </>
                )} */}
                {/* <Form.Control.Feedback type="invalid">
                  Please select a valid image file (JPG, JPEG, PNG).
                </Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Date of Birth
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={
                    item?.dob
                      ? new Date(item?.dob).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  isInvalid={!validateField("dob", item?.dob)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Date of Birth.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Date of Joining <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="doj"
                  required
                  placeholder="Date of Joining"
                  value={
                    item?.doj
                      ? new Date(item?.doj).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  isInvalid={!validateField("doj", item?.doj)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Date of Joining.
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  <h5>Gender</h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={item?.gender}
                  onChange={handleChange}
                />
              </Form.Group> */}

              <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                <Form.Label>
                  Gender<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select name="gender" required value={item?.gender}>
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid() || isApiHit}
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

export default PersonalInformation;
