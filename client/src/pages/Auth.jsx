import { useState } from "react";

import useAuthForm from "../hooks/useAuthForm";

import Input from "../components/Form/Input";
import "../style/login.css";
const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { formData, errors, handleChange, handleSubmit } =
    useAuthForm(isRegister);

  const fields = [
    {
      id: 1,
      name: "Name",
      inputName: "name",
      value: formData.name,
      type: "text",
      error: errors.name,
    },
    {
      id: 2,
      name: "Email",
      inputName: "email",
      value: formData.email,
      type: "text",
      error: errors.email,
      placeholder: "Email",
    },
    {
      id: 3,
      name: "Password",
      inputName: "password",
      value: formData.password,
      type: "password",
      error: errors.password,
      placeholder: "Password",
    },
  ];

  const mapFields = isRegister ? fields : fields.slice(1);

  return (
    <div className="all-page-login ">
      <section className="logincontainer">
        <h2>{isRegister ? "Register" : "Log In"}</h2>
        <form onSubmit={handleSubmit}>
          {mapFields.map((field) => (
            <Input key={field.id} {...field} handleChange={handleChange} />
          ))}
          <button className="button-88 btn-log" type="submit">
            {isRegister ? "Register" : "Log In"}
          </button>
          <p className="switch" onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Log In"
              : "Don't have an account yet? Register"}
          </p>
        </form>
      </section>
    </div>
  );
};

export default Auth;
