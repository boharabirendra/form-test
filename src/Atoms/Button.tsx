type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const Button = ({ ...props }: ButtonProps) => {
  return <button className="btn" {...props} />;
};

export default Button;
