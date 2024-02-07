type LoadingButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
};

export const LoadingButton = ({
  onClick,
  disabled,
  isLoading,
  children,
  className = "",
}: LoadingButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      className={`flex align-center justify-center ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
