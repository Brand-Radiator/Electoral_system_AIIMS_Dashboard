import React from "react";
import {
  useForm,
  Resolver,
  SubmitHandler,
  UseFormReset,
  FieldValues,
  UnpackNestedValue,
  DeepPartial,
} from "react-hook-form";

interface VerticalFromProps<TFormValues extends FieldValues> {
  defaultValues?: UnpackNestedValue<DeepPartial<TFormValues>> | undefined;
  resolver?: Resolver<TFormValues>;
  children?: any;
  onSubmit: SubmitHandler<TFormValues>;
  formClass?: string;
  reset?: UseFormReset<TFormValues>;
}

const VerticalForm = <TFormValues extends FieldValues = FieldValues>({
  defaultValues,
  resolver,
  children,
  onSubmit,
  formClass,
  reset,
}: VerticalFromProps<TFormValues>) => {
  /*
   * form methods
   */
  const methods = useForm<TFormValues>({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props && child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                    errors,
                    control,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default VerticalForm;
