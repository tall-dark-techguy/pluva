export const Spinner = ({
  size = "sm",
  type = "border",
  className,
  ...rest
}) => {
  return (
    <span
      className={`spinner-${type} spinner-${type}-${size} ${className}`}
      role="status"
      aria-hidden="true"
      {...rest}
    ></span>
  );
};

/* Type: border, grow */
/* Size: sm, md, lg */
