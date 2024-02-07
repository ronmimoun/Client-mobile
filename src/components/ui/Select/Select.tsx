import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  FormLabel,
  FormSelectProps,
} from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

type SelectProps = {
  name: string;
  list: any[];
  accessor: string;
  defaultValue?: string;
  label?: string;
  handleChange?: (value: string | null) => void;
  required?: boolean;
} & FormSelectProps;

export const Select = ({
  name,
  defaultValue,
  list,
  accessor,
  label,
  handleChange,
  required,
  ...props
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [value, setValue] = useState<string>(
    defaultValue || "Select an option"
  );

  const onChange = (selectedItem: string | null) => {
    setValue(selectedItem || "");
    handleChange && handleChange(selectedItem);
  };

  return (
    <Controller
      name={name}
      rules={{ required }}
      control={control}
      render={({ field }) => {
        return (
          <div className="select_wrapper">
            {label && <FormLabel>{label}</FormLabel>}
            <Dropdown
              {...props}
              onSelect={(selectedItem) => {
                onChange(selectedItem);
                field.onChange(selectedItem);
              }}
              className="select_container"
            >
              <DropdownButton
                id={`${name}-dropdown-button`}
                title={field.value || value}
                disabled={props.disabled}
              >
                {list.map((item, index) => (
                  <Dropdown.Item key={index} eventKey={item[accessor]}>
                    {item[accessor]}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Dropdown>
            {errors[name] && (
              <div className="select_error">
                <MdErrorOutline />
                <span>{`${errors[name]?.message}`}</span>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
