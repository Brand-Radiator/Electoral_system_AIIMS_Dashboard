// import React from "react";

// const AcademicSection = () => {
//   return <div>AcademicSection</div>;
// };

// export default AcademicSection;

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";

interface AcademicInfo {
  orcidId: string;
  scopusId: string;
  researcherId: string;
  googleScholarId: string;
  vidwanId: string;
}

interface AcademicInfoProps {
  item: AcademicInfo;
  handleAcademicSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: AcademicInfo
  ) => Promise<void>;
  setAcademicInfo: React.Dispatch<React.SetStateAction<AcademicInfo>>;
  isApiHit: boolean;
}

const AcademicSection = ({
  item,
  handleAcademicSubmit,
  setAcademicInfo,
  isApiHit,
}: AcademicInfoProps) => {
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (e: any) => {
    const { name, value, files, type } = e.target;

    if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setAcademicInfo((prevData) => ({
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
      setAcademicInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file, update the state as usual
      setAcademicInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const regexValidation = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "orcidId":
        return /^[A-Za-z0-9-]+$/.test(value?.trim());
      case "scopusId":
        return /^[A-Za-z0-9-]+$/.test(value?.trim());
      case "researcherId":
        return /^[A-Za-z0-9-]+$/.test(value?.trim());
      case "googleScholarId":
        return /^[A-Za-z0-9-]+$/.test(value?.trim());

      default:
        return true;
    }
  };

  const validateField = (fieldName: string, value: string) => {
    return regexValidation(fieldName, value);
  };

  const isFormValid = () => {
    const isOrcidIdValid = validateField("orcidId", item?.orcidId);
    const isScopusIdValid = validateField("scopusId", item?.scopusId);
    const isResearcherIdValid = validateField(
      "researcherId",
      item?.researcherId
    );
    const isGoogleScholarIdValid = validateField(
      "googleScholarId",
      item?.googleScholarId
    );
    const isvidwanIdValid = validateField(
      "vidwanId",
      item?.vidwanId
    );
    return (
      isOrcidIdValid &&
      isScopusIdValid &&
      isResearcherIdValid &&
      isGoogleScholarIdValid &&
      isvidwanIdValid
    );
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleAcademicSubmit(e, item)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Orcid Id
                   {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="orcidId"
                  placeholder="Enter Orcid Id "
                  value={item?.orcidId}
                  // required
                  onChange={handleChange}
                  // isInvalid={!validateField("orcidId", item?.orcidId)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Orcid Id.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Scopus Id 
                   {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="scopusId"
                  placeholder="Enter Scopus Id"
                  value={item?.scopusId}
                  // required
                  onChange={handleChange}
                  // isInvalid={!validateField("scopusId", item?.scopusId)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Scopus Id.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Researcher Id 
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="researcherId"
                  placeholder="Enter Researcher Id"
                  value={item?.researcherId}
                  // required
                  onChange={handleChange}
                  // isInvalid={!validateField("researcherId", item?.researcherId)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Researcher Id.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Google Scholar Id 
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="googleScholarId"
                  placeholder="Enter Google Scholar Id"
                  value={item?.googleScholarId}
                  // required
                  onChange={handleChange}
                  // isInvalid={
                  //   !validateField("googleScholarId", item?.googleScholarId)
                  // }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Google Scholar Id.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                Vidwan Id
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="vidwanId"
                  placeholder="Enter Vidwan Id"
                  value={item?.vidwanId}
                  // required
                  onChange={handleChange}
                  // isInvalid={
                  //   !validateField("vidwanId", item?.vidwanId)
                  // }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Vidwan Id.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  // disabled={!isFormValid() || isApiHit}
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

export default AcademicSection;
