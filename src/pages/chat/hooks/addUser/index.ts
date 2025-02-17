import {SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
  number: string;
}

export const useAddUserHook = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    reset({number: ""});
  };

  const userData = localStorage.getItem("user");
  const userParse: IFormInput = JSON.parse(userData || "{}");

  return {
    register,
    userParse,
    errors,
    handleSubmit,
    onSubmit
  };
};