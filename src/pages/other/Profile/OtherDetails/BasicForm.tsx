import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  checkbox: boolean;
}

interface Item {
  id: number;
  title: string;
  icon?: string;
  text: string;
}

const BasicForm = ({ item }: any) => {
  /*
      form validation schema
      */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required("Please enter Username"),
      email: yup.string().required("Please enter Email address"),
      password: yup.string().required("Please enter Password"),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("This value is required."),
      checkbox: yup.bool().oneOf([true]),
    })
  );
  const { handleSubmit, control, setValue, reset } = useForm({
    resolver: schemaResolver,
  });

  // Function to be called when the form is submitted
  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    // You can perform additional actions or API calls with the form data here
  };

  //   console.log(item, "ITEM_NAME");

  return (
    // <Card>
    //   <Card.Body>
    <>
      <h4 className="header-title mt-0 mb-1">Basic Form</h4>
      <p className="sub-header">
        React validation with react-hook-form library.
      </p>
      <VerticalForm
        onSubmit={onSubmit}
        resolver={schemaResolver}
        reset={reset}
        defaultValues={{ username: "test" }}
      >
        <FormInput
          label={"Username"}
          type="text"
          name="username"
          placeholder="Enter your name"
          containerClass={"mb-3"}
        />
        <FormInput
          label={"Email address"}
          type="email"
          name="email"
          placeholder="Enter email"
          containerClass={"mb-3"}
        />
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          placeholder="Password"
          containerClass={"mb-3"}
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          name="confirmpassword"
          placeholder="Password"
          containerClass={"mb-3"}
        />
        {/* <FormInput
          label={"Remember me"}
          type="checkbox"
          name="checkbox"
          containerClass={"mb-3"}
        /> */}

        <div className="text-md-end mb-0">
          <Button variant="primary" className="me-1" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="reset">
            Cancel
          </Button>
        </div>
      </VerticalForm>
    </>
    //   </Card.Body>
    // </Card>
  );
};

export default BasicForm;
