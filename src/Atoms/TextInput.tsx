interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  id,
  label,
  value,
  type,
  name,
  onChange,
}: TextInputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type || "text"}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        required
      />
    </>
  );
};

export default TextInput;
