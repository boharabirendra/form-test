import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../Atoms/Button";
import TextInput from "../Atoms/TextInput";
import { RootState } from "../Store/store";
import { currentFormState } from "../Store/formSlice";

const Form = () => {
  const navigate = useNavigate();
  const formState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(formState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(currentFormState(formData));
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form role="form" onSubmit={handleSubmit} className="login__form">
        <div className="login__form__field">
          <TextInput
            type="text"
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="login__form__field">
          <TextInput
            type="email"
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <Button typeof="submit" className="login__form__login">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Form;
