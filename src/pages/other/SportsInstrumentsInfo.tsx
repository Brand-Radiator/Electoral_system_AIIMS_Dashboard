// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
// import PageTitle from "../../components/PageTitle";

// interface missionAndVisionAchievement {
//   _id: string;
//   bannerUrl: string;
//   mobileBannerUrl: string;
//   pageImage: string;
//   heading: string;
//   paragraph: string;
// }

// const DeletePolicy = () => {
//   const [validated, setValidated] = useState<boolean>(false);

//   const [missionandvision, setMissionandVision] = useState<
//     missionAndVisionAchievement[]
//   >([]);

//   const deleteItem = async (itemId: string) => {
//     try {
//       const response = await fetch(
//         `http://165.22.219.69:5002/api/introduction/${itemId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       // Assuming you want to parse the JSON response
//       const data = await response.json();
//       console.log("data -----------", data);
//     } catch (error) {
//       console.error("Error during edit the banner:", error);
//     }
//   };
//   useEffect(() => {
//     fetch("http://165.22.219.69:5002/api/introduction")
//       .then((response) => response.json())
//       .then((res) => setMissionandVision(res));
//   }, []);

//   console.log(missionandvision, "data");

//   return (
//     <>
//       <>
//         <h4>Delete Sports Instruments Information </h4>

//         <Card>
//           <Card.Body>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Sr. N</th>
//                   <th>Title</th>
//                   <th>Paragraph</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(missionandvision || []).map((item, i) => (
//                   <tr key={item._id}>
//                     <td>{i + 1}</td> {/* You can use i+1 as the index */}
//                     <td>{item.heading}</td>
//                     <td>{item.paragraph}</td>
//                     <td>
//                       {/* Delete button */}
//                       <button
//                         onClick={() => deleteItem(item._id)}
//                         className="btn btn-danger"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </>
//     </>
//   );
// };

// const SportsInstruments = () => {
//   const [validated, setValidated] = useState<boolean>(false);
//   const [introductionData, setIntroductionData] = useState<
//     missionAndVisionAchievement[]
//   >([]);

//   const [heading, setHeading] = useState("");
//   const [paragraph, setParagraph] = useState("");

//   const [bannerUrl, setBannerUrl] = useState<File | null>(null);
//   const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);
//   const [pageImage, setPageImageUrl] = useState<File | null>(null);

//   const handleSubmit = async (event: any) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   useEffect(() => {
//     fetch("http://165.22.219.69:5002/api/introduction")
//       .then((response) => response.json())
//       .then((res) => setIntroductionData(res)); // resolve this response/ promise
//   }, []);

//   //   ------------------------------------------ setting image in the input--------------------------------
//   const handleBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setBannerUrl(e.target.files[0]);
//     }
//   };

//   const handleMobileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setMobileUrl(e.target.files[0]);
//     }
//   };

//   const handlePageImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setPageImageUrl(e.target.files[0]);
//     }
//   };

//   /*---------------- handle Form submit ---------------------------------------*/

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     } else {
//       event.preventDefault();
//       const formData = new FormData();
//       formData.append("heading", heading);
//       formData.append("paragraph", paragraph);

//       if (bannerUrl) {
//         formData.append("bannerUrl", bannerUrl);
//       }
//       if (mobileBannerUrl) {
//         formData.append("mobileBannerUrl", mobileBannerUrl);
//       }
//       if (pageImage) {
//         formData.append("pageImage", pageImage);
//       }

//       console.log("formData-------,", formData);

//       try {
//         const response = await fetch(`http://165.22.219.69:5002/api/introduction`, {
//           method: "POST",
//           body: formData,
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         // Assuming you want to parse the JSON response
//         const data = await response.json();
//         console.log("data -----------", data);
//       } catch (error) {
//         console.error("Error during edit the banner:", error);
//       }
//     }
//     setValidated(true);
//   };

//   /*----------------  handle update----------------*/

//   let objectId: any;

//   if (introductionData.length > 0) {
//     const { _id } = introductionData[0];
//     objectId = _id;
//   }

//   const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     } else {
//       event.preventDefault();
//       const formData = new FormData();
//       formData.append("heading", heading);
//       formData.append("paragraph", paragraph);

//       if (bannerUrl) {
//         formData.append("bannerUrl", bannerUrl);
//       }
//       if (mobileBannerUrl) {
//         formData.append("mobileBannerUrl", mobileBannerUrl);
//       }
//       if (pageImage) {
//         formData.append("pageImage", pageImage);
//       }

//       try {
//         const response = await fetch(
//           `http://165.22.219.69:5002/api/introduction/${objectId}`,
//           {
//             method: "PATCH",
//             body: formData,
//           }
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         // Assuming you want to parse the JSON response
//         const data = await response.json();
//       } catch (error) {
//         console.error("Error during edit the banner:", error);
//       }
//     }
//     setValidated(true);
//   };

//   return (
//     <>
//       <div>
//         <PageTitle
//           breadCrumbItems={[
//             { label: "Pages", path: "/pages/sports-instruments-information" },
//             {
//               label: "Sports Instruments Information",
//               path: "/pages/sports-instruments-information",
//               active: true,
//             },
//           ]}
//           title={"Sports Instruments Information "}
//         />
//         <Card>
//           <Card.Body>
//             <Row>
//               {introductionData.length === 1 ? (
//                 <Col lg={6}>
//                   <Form
//                     style={{ width: "100%" }}
//                     onSubmit={handleFormSubmit}
//                     encType="multipart/form-data"
//                   >
//                     <h4>Sports Instruments Information </h4>
//                     {/* <> */}
//                     <Form.Group>
//                       <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
//                         <h5>Heading</h5>
//                       </Form.Label>
//                       <Form.Control
//                         className="accordion-item"
//                         type="text"
//                         placeholder="Heading"
//                         defaultValue=""
//                         onChange={(e) => setHeading(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
//                         <h5>Paragraph</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Paragraph"
//                         defaultValue=""
//                         onChange={(e) => setParagraph(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Banner Image</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="bannerUrl"
//                         accept="image/*"
//                         onChange={handleBannerUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Mobile Banner Image</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="mobileBannerUrl"
//                         accept="image/*"
//                         onChange={handleMobileUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Upload documents</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="pageImage"
//                         accept="image/*"
//                         onChange={handlePageImageUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group className="pt-5 pb-5">
//                       <Button type="submit">Add</Button>
//                     </Form.Group>
//                   </Form>
//                 </Col>
//               ) : (
//                 <Col lg={6}>
//                   <Form
//                     style={{ width: "100%" }}
//                     onSubmit={handleUpdate}
//                     encType="multipart/form-data"
//                   >
//                     <h4>Sports Instruments Information</h4>
//                     {/* <> */}
//                     <Form.Group>
//                       <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
//                         <h5>Title</h5>
//                       </Form.Label>
//                       <Form.Control
//                         className="accordion-item"
//                         type="text"
//                         placeholder="Heading"
//                         defaultValue={introductionData[0]?.heading}
//                         onChange={(e) => setHeading(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
//                         <h5>Description</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Paragraph"
//                         defaultValue={introductionData[0]?.paragraph}
//                         onChange={(e) => setParagraph(e.target.value)}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Desktop Banner Image</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="bannerUrl"
//                         accept="image/*"
//                         onChange={handleBannerUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Mobile Banner Image</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="mobileBannerUrl"
//                         accept="image/*"
//                         onChange={handleMobileUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label className="d-flex pt-1 justify-content-start">
//                         <h5>Upload documents</h5>
//                       </Form.Label>
//                       <Form.Control
//                         type="file"
//                         id="image"
//                         name="pageImage"
//                         accept="image/*"
//                         onChange={handlePageImageUrl}
//                       />
//                     </Form.Group>

//                     <Form.Group className="pt-5 pb-5">
//                       <Button type="submit">Edit Form</Button>
//                     </Form.Group>
//                   </Form>
//                 </Col>
//               )}

//               {/* -------------------------- update data--------------------------------------------- */}
//             </Row>
//           </Card.Body>
//         </Card>

//         <DeletePolicy />
//       </div>
//     </>
//   );
// };

// export default SportsInstruments;

// -------------------------------------- demo-------

import React, { useState } from "react";
import axios from "axios";

interface Image {
  name: string;
  description: string;
  file: File;
}

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const selectedImages: Image[] = Array.from(selectedFiles).map((file) => ({
        name: "",
        description: "",
        file,
      }));
      setImages(selectedImages);
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select one or more images to upload.");
      return;
    }
    const formData = new FormData();

    // images.forEach((image, index) => {
    //   formData.append(`images[${index}].name`, image.name);
    //   formData.append(`images[${index}].description`, image.description);
    //   formData.append(`images[${index}].file`, image.file);
    // });
    // --------------------------------------

    images.forEach((image, index) => {
      formData.append(`images[${index}].name`, image.name);
      formData.append(`images[${index}].description`, image.description);
      formData.append(`images`, image.file);
    });

    // ---------------------------------------------------------------

    // formData.append('images[0].name', name); // Use the same format as for images
    // formData.append('images[0].description', description); // Use the same format as for images

    // images.forEach((image, index) => {
    //   formData.append(`name`, image.name);
    //   formData.append(`description`, image.description);
    //   formData.append(`images`, image.file);
    // });

    try {
      const response = await fetch(`http://165.22.219.69:5002/api/upload`, {
        method: "POST",
        body: formData,
        //  headers: {
        //        'Content-Type': 'multipart/form-data',
        //      },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // await axios.post('/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input
        type="file"
        accept="image/*"
        name="images"
        multiple
        onChange={handleImageChange}
      />
      <br />
      {images.map((image, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={image.name}
            onChange={(e) => {
              const updatedImages = [...images];
              updatedImages[index].name = e.target.value;
              setImages(updatedImages);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={image.description}
            onChange={(e) => {
              const updatedImages = [...images];
              updatedImages[index].description = e.target.value;
              setImages(updatedImages);
            }}
          />
          <br />
        </div>
      ))}
      <button onClick={() => handleUpload()}>Upload</button>
    </div>
  );
};

export default ImageUpload;
