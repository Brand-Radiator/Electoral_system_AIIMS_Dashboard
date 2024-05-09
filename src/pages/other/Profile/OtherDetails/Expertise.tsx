import React from "react";
import { Card, Button, Row, Col, Form, Alert } from "react-bootstrap";

interface ExpertiseSection {
  expertise: string;
  briefInfo: string;
  subject: string;
}

interface ExpertiseProps {
  item: ExpertiseSection;
  handleExpertiseSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ExpertiseSection
  ) => Promise<void>;
  setExpertise: React.Dispatch<React.SetStateAction<ExpertiseSection>>;
  isApiHit: boolean;
}

const Expertise = ({
  item,
  handleExpertiseSubmit,
  setExpertise,
  isApiHit,
}: ExpertiseProps) => {
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setExpertise((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else {
      // If the input type is not a file, update the state as usual
      setExpertise((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleExpertiseSubmit(e, item)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Expertise 
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="expertise"
                  placeholder="Enter Expertise"
                  value={item?.expertise}
                  // required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Subject
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  value={item?.subject}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Subject
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  value={item?.subject}
                  onChange={handleChange}
                />
              </Form.Group> */}

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  {/* <h5> */}
                  Field Of Interest
                  {/* </h5> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="briefInfo"
                  placeholder="Enter Brief Info"
                  value={item?.briefInfo}
                  // required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                {isApiHit ? (
                  <Button variant="primary" type="submit" disabled>
                    Saving
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                )}

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

export default Expertise;
