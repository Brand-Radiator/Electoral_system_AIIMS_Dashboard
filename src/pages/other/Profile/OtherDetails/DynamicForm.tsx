import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput, VerticalForm } from "../../../../components";
import { profile } from "console";

interface Section {
  id: number;
  formtitle: string;
  objectKey: string;
  fields: Field[];
}

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}

interface ContentType {
  id: number;
  formtitle: string;
  icon?: string;
  text?: string;
  formData?: Object;
  personalInfo?: Object;
  expertise?: Object;
  contactInfo?: Object;
  experience?: Array<Object>;
  education?: Array<Object>;
  honoursAndAwards?: Array<Object>;
  doctoralTheses?: Array<Object>;
  professionalMemberships?: Array<Object>;
  committeeMemberships?: Array<Object>;
  researchProjects?: Array<Object>;
  patents?: Array<Object>;
  publications?: Array<Object>;
  objectKey?: string;
  fields?: Field[] | undefined;
}

// const schemaResolver = yupResolver(
//   yup.object().shape({
//     // Define your validation schema based on the form fields
//   })
// );

const schemaResolver = yupResolver(
  yup.object().shape({
    // username: yup.string().required("Please enter Username"),
    // email: yup.string().required("Please enter Email address"),
    // password: yup.string().required("Please enter Password"),
    // confirmpassword: yup
    //   .string()
    //   .oneOf([yup.ref("password"), null], "Passwords don't match")
    //   .required("This value is required."),
    // checkbox: yup.bool().oneOf([true]),
  })
);

interface DynamicFormProps {
  item: ContentType;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ item }) => {
  const [profileData, setProfileData] = useState(item);
  const [currentProfiledData, setCurrentProfiledData] = useState<any>();
  const { handleSubmit, control, setValue, reset } = useForm({
    resolver: schemaResolver,
  });

  // console.log(item, "ITEMSSSS");

  // const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(
  //   (data) => {
  //     // console.log(control, "Control");

  //     console.log(data, "DATA in dynamic form");
  //     // if (item?.fields) {
  //     //   const mappedData: any = mapFormData(data, item.fields);
  //     //   // Handle form submission with mappedData
  //     //   console.log(mappedData);
  //     // } else {
  //     //   console.error("Fields are undefined in the item.");
  //     // }
  //   }
  // );

  // const mapFormData = (data: any, fields: Field[]) => {
  //   const mappedData: any = {};

  //   fields.forEach((field) => {
  //     const name = field.name;
  //     const keys = name.split(".");
  //     let currentData = mappedData;

  //     keys.forEach((key, index) => {
  //       if (index === keys.length - 1) {
  //         // Last key, assign the value
  //         currentData[key] = data[name];
  //       } else {
  //         // Create nested objects if not present
  //         currentData[key] = currentData[key] || {};
  //         currentData = currentData[key];
  //       }
  //     });
  //   });

  //   return mappedData;
  // };

  // console.log(profileData, "BEFORE SUBMIT");

  const onSubmit = (data: any, e: any) => {
    // console.log("Submitted event:", e);
    // console.log("Submitted data:", data);
    // console.log(profileData, "PROFILE DATA");
    console.log(profileData, "Current profile data");

    // You can perform additional actions or API calls with the form data here
  };

  // Function to handle text input changes
  const handleTextInputChange = (name: string, value: string) => {
    let splitArray = name.split(".");
    console.log(splitArray, "ARRAY");

    let objectKey: any = splitArray[0];
    console.log(objectKey, "OBJECT_KEY");

    let actualName = splitArray[1];
    setValue(name, value); // Set the value in the react-hook-form state
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
    // setProfileData((prevData) => ({ ...prevData, [actualName]: value })); // Update the local state
    // setCurrentProfiledData({ [objectKey]: { profileData } });
  };

  return (
    <Card>
      <Card.Body>
        <VerticalForm onSubmit={onSubmit} reset={reset}>
          {item?.fields?.map((field: any, index: any) => (
            <div key={index}>
              <h4 className="header-title mt-3 mb-1">{field.formtitle}</h4>
              <React.Fragment key={field.name}>
                {field.type === "select" && field.options ? (
                  <FormInput
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    // control={control}
                    onChange={(e) =>
                      handleTextInputChange(field.name, e.target.value)
                    }
                    options={field.options}
                  />
                ) : (
                  <FormInput
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    control={control}
                    onChange={(e) =>
                      handleTextInputChange(field.name, e.target.value)
                    }
                  />
                )}
              </React.Fragment>
            </div>
          ))}
          <div className="text-md-end mb-0" style={{ marginTop: "10px" }}>
            <Button variant="primary" className="me-1" type="submit">
              Save
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </div>
        </VerticalForm>
      </Card.Body>
    </Card>
  );
};

export default DynamicForm;
