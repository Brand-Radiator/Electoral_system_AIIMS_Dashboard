import axios from "axios";
import React, { useEffect, useState, FormEvent } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  DropdownButton,
  Dropdown,
  Card,
} from "react-bootstrap";
import { API_BASE_URL } from "../../../apiservices/apiService";
// import { Card, Dropdown, Container, Form, } from "react-bootstrap";
const data = [{ heading: "heading", paragraph: "paragraph", image: "image" }];
export interface HeaderType {
  _id: string;
  designation: string;
  profileName: string;
  slogan: string;
  state: string;
  image: string;
}

const HeaderTwo = () => {
  const [headerData, setHeaderData] = useState<HeaderType[]>([]);
  const [designation, setDesignation] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [image, setImage] = useState<null | string>(null);

  const getData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/header`);
      const data = response.data;
      setHeaderData(data);
    } catch (error) {
      // console.error("error", error);
    }
  };

  // useEffect(()=>{
  //      axios.get('http://165.22.219.69:5002/get/header')
  //     .then((response)=>{
  //         	console.log('data ---------  ', response.data)
  //     })
  //     .catch((err)=>{
  //         alert(err)
  //     })
  // },[])

  useEffect(() => {
    fetch(`${API_BASE_URL}/get/header`)
      .then((response) => response.json())
      .then((res) => setHeaderData(res)); // resolve this response/ promise
  }, []);

  // ---------------------------------------------with fetch----------
  const editBanner = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("clicked");

    const formData = new FormData();
    formData.append("designation", designation);
    formData.append("profileName", profileName);
    formData.append("slogan", slogan);
    formData.append("state", state);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/update/header/64f327a71996af67d9c57391`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();

      setDesignation("");
      setProfileName("");
      setSlogan("");
      setState("");
      setImage(null);
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  // -----------------------------------------with axios --------------------------------------

  // const editBanner = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
  //     event.preventDefault();
  //     alert('clicked');
  //     const formData: FormData = new FormData();
  //     formData.append('heading', heading);
  //     formData.append('paragraph', paragraph);
  //     if(image){
  //         formData.append('image', image);
  //     }
  //     console.log(formData);
  //     try {
  //     //   await api.updatePatchData(`/update/header/64c9126d1b2b99a36068ede3`, formData);
  //     const response = await axios.post('http://165.22.219.69:5002/add/header',formData);

  //       setHeading("");
  //       setParagraph("");
  //       setImage(null);
  //     } catch (error) {
  //       console.error('Error during edit the banner:', error);
  //     }
  //   };

  return <></>;
};
export default HeaderTwo;
