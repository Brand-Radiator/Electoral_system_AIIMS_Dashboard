import React, { ChangeEvent, useEffect, useState } from "react";

// components
import PageTitle from "../../components/PageTitle";
import { Card, Col, Row, Button, InputGroup, Form } from "react-bootstrap";
import apiService from "../../apiservices/apiService";

interface MyComponentState {
  heading: string;
  paragraph: string;
  bannerUrl: File | null;
  pageImage: File | null;
  mobileBannerUrl: File | null;
}

const intiState: MyComponentState = {
  heading: "",
  paragraph: "",
  bannerUrl: null,
  pageImage: null,
  mobileBannerUrl: null,
};

const Introduction = () => {
  const [validated, setValidated] = useState<boolean>(false);
  // const [data, setData] = useState<MyComponentState[]>([]);
  const [formData, setFormData] = useState<MyComponentState>(intiState);
  // console.log(formData, "FORM DATA");

  const fetchData = () => {
    apiService
      .get<MyComponentState[]>("api/introduction")
      .then((response) => {
        // setData(response);

        if (response.length > 0) {
          const firstData = response[0];
          setFormData({
            heading: firstData.heading,
            paragraph: firstData.paragraph,
            bannerUrl: firstData.bannerUrl,
            pageImage: firstData.pageImage,
            mobileBannerUrl: firstData.mobileBannerUrl,
          });
        }
      })

      .catch((error) => {
        console.error("GET Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*
   * handle input changes from
   */

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /*
   * handle image changes from
   */

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const files = e.target.files;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  /*
   * handle form submission
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const data = new FormData();

        data.append("heading", formData.heading);

        data.append("paragraph", formData.paragraph);
        if (formData?.bannerUrl !== null) {
          data.append("bannerUrl", formData.bannerUrl);
        }
        if (formData?.pageImage !== null) {
          data.append("pageImage", formData.pageImage);
        }
        if (formData?.mobileBannerUrl !== null) {
          data.append("mobileBannerUrl", formData.mobileBannerUrl);
        }

        // console.log(data, "FFFFFFF");

        // const addData: any = await apiService.patch("add/aboutus", data);
        // const addData: any = await apiService.post("api/introduction", data);

        // console.log(addData, "RESPONSE");
        const { heading, paragraph } = formData;
        const ddddd = {
          heading,
          paragraph,
          bannerUrl: "http://165.22.219.69:5002/api/introduction",
          mobileBannerUrl: "http://165.22.219.69:5002/api/introduction",
          pageImage: "http://165.22.219.69:5002/api/",
        };
        const response = await fetch(
          "http://165.22.219.69:5002/api/introduction",
          {
            method: "POST",
            headers: {
              "Content-Type": `multipart/form-data`,
            },
            body: data,
          }
        ).then((response) => alert("form submitted successfully"));
      } catch (error) {
        console.error("Error updating data:", error);
        alert("Failed to update the form. Please try again later.");
      }
    }
    setValidated(true);

    // console.log(formData);
  };

  /*
handle form update
*/

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Pages", path: "/pages/introduction" },
          { label: "Introduction", path: "/pages/introduction", active: true },
        ]}
        title={"Introduction"}
      />
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <h4 className="header-title">Introduction of BSSA</h4>
              <p className="sub-header">Add the introduction page content.</p>

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="title"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom02">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="description"
                    name="paragraph"
                    value={formData.paragraph}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom03">
                  <Form.Label>Banner (Desktop)</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="bannerUrl"
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload a valid file.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom04">
                  <Form.Label>Banner (Mobile)</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="upload banner"
                    required
                    name="mobileBannerUrl"
                    // value={formData.mobileBannerUrl}
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload a valid file.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom04">
                  <Form.Label>Introduction image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="upload image"
                    required
                    name="pageImage"
                    // value={formData.pageImage}
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please upload a valid file.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Check
                    id="validation-check"
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                  />
                </Form.Group> */}
                <Button type="submit">Edit form</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Introduction;
