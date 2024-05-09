import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";

interface PersonalInfo {
  name: string;
  designation: string;
  employeeid: string;
  dob: string;
  doj: string;
  gender: string;
}

interface PersonalInfoProps {
  item: PersonalInfo;
  onSubmit: (formData: PersonalInfo) => void;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}

const PersonalInformation = ({
  item,
  onSubmit,
  setPersonalInfo,
}: PersonalInfoProps) => {
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Name"),
      designation: yup.string().required("Please enter Designation"),
      employeeid: yup.string().required("Please enter Employee I'd"),
      dob: yup.string().required("Please enter Date of Birth"),
      doj: yup.string().required("Please enter Date of Joining"),
      gender: yup.string().required("Please enter Gender"),
    })
  );

  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: schemaResolver,
  });

  useEffect(() => {
    // Set form values when 'item' changes
    setValue("name", item?.name || "");
    setValue("designation", item?.designation || "");
    setValue("employeeid", item?.employeeid || "");
    setValue("dob", item?.dob || "");
    setValue("doj", item?.doj || "");
    setValue("gender", item?.gender || "");
  }, [item, setValue]);

  const handleFormSubmit = (data: any) => {
    setPersonalInfo((prevData) => ({ ...prevData, ...data }));
    onSubmit(data);
    // Also update the local state in the parent component
    // setPersonalInfo(data);
  };

  return (
    <Card>
      <Card.Body>
        <VerticalForm
          onSubmit={
            handleSubmit(handleFormSubmit) as SubmitHandler<Record<string, any>>
          }
          reset={reset}
        >
          <FormInput
            label={"Name"}
            type="text"
            placeholder="Enter your name"
            containerClass={"mb-3"}
            value={item?.name}
            {...register("name")}
          />
          <FormInput
            label={"Designation"}
            type="text"
            placeholder="Enter Designation"
            containerClass={"mb-3"}
            value={item?.designation}
            {...register("designation")}
          />
          <FormInput
            label={"Employee I'd / Biometric I'd"}
            type="text"
            placeholder="Enter Employee I'd / Biometric I'd"
            containerClass={"mb-3"}
            value={item?.employeeid}
            {...register("employeeid")}
          />
          <FormInput
            label={"Date of Birth"}
            type="date"
            placeholder="Date of Birth"
            containerClass={"mb-3"}
            value={item?.dob}
            {...register("dob")}
          />
          <FormInput
            label={"Date of Joining"}
            type="date"
            placeholder="Date of Joining"
            containerClass={"mb-3"}
            value={item?.doj}
            {...register("doj")}
          />
          <FormInput
            label={"Gender"}
            type="text"
            placeholder="Gender"
            containerClass={"mb-3"}
            value={item?.gender}
            {...register("gender")}
          />

          <div className="text-md-end mb-0">
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

export default PersonalInformation;
