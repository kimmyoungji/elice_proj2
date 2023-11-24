import { BrowserRouter } from "react-router-dom";
import RegisterForm from "../features/Register/RegisterForm";

const RegisterPage = () => {
  return (
    <BrowserRouter>
      <RegisterForm />
    </BrowserRouter>
  );
};

export default RegisterPage;
