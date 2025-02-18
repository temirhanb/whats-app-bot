import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";

interface IFormInput {
  apiTokenInstance: string;
  idInstance: string;
}

export const useAuthPageHook = () => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));

    navigate("/chat");
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit
  };
};