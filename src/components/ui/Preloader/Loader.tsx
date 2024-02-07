type LoaderProps = {
  size?: number;
  className?: string;
};

export const Loader = ({ size, className }: LoaderProps) => {
  const hasSize = size ? { width: size, height: size } : {};
  return (
    <div
      style={hasSize}
      className={`img-loader ${className ? className : ""}`}
    />
  );
};
