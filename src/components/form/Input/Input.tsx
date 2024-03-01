import { useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

export type InputProps = {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  className?: string;
  required?: boolean;
};

export const Input = ({
  label,
  placeholder,
  type,
  name,
  required,
  className,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`input-container ${className}`}>
      {label && <label>{label}</label>}
      {errors[name] && (
        <p className="input-container__error">
          <MdErrorOutline />
          {errors[name]?.message as string}
        </p>
      )}
      <input
        className="input"
        required={required}
        placeholder={placeholder}
        type={type || "text"}
        {...register(name)}
      />
    </div>
  );
};
