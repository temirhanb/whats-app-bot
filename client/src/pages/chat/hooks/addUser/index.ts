import {SubmitHandler, useForm} from "react-hook-form";
import {useAuthStore} from "../../../../store";

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
  const {setNumber} = useAuthStore(state => state);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setNumber(data.number);
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