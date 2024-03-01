import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputProps } from "../Input/Input";

type InputControllerProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  InputProps;

export const InputController = ({
  name,
  className = "",
  ...props
}: InputControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ required: props.required }}
      name={name}
      render={({ field }) => {
        const { ref, ...restField } = field;
        return <Input {...restField} {...props} className={className} />;
      }}
    />
  );
};
