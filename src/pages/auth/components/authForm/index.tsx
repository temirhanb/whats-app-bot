import React from "react";
import {Button, styled, TextField, Typography} from "@mui/material";
import {useAuthPageHook} from "../../hooks";

export const AuthForm: React.FC = () => {

  const {handleSubmit, onSubmit, errors, register} = useAuthPageHook();
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant={"h2"}>Authorisation</Typography>
      <TextField
        label={"apiUrl"}
        variant={"standard"}
        error={errors.apiUrl && true}
        helperText={errors.apiUrl && errors.apiUrl.message}
        {...register("apiUrl", {
          required: "apiUrl is required.",
          minLength: {value: 4, message: "This input exceed min length."},
          maxLength: {value: 500, message: "This input exceed max length."}
        })}
      />
      <TextField
        label={"idInstance"}
        variant={"standard"}
        error={errors.idInstance && true}
        helperText={errors.idInstance && errors.idInstance.message}
        {...register("idInstance", {
          required: "idInstance is required.",
          minLength: {value: 4, message: "This input exceed min length."},
          maxLength: {value: 500, message: "This input exceed max length."}
        })}
      />
      <TextField
        label={"apiTokenInstance"}
        variant={"standard"}
        error={errors.apiTokenInstance && true}
        helperText={errors.apiTokenInstance && errors.apiTokenInstance.message}
        {...register("apiTokenInstance", {
          required: "apiTokenInstance is required.",
          minLength: {value: 4, message: "This input exceed min length."},
          maxLength: {value: 500, message: "This input exceed max length."}
        })}
      />
      <Button type={"submit"} variant={"outlined"}>Register</Button>
    </FormContainer>
  );
};

const FormContainer = styled("form")`
  display: grid;
  grid-column: 1;
  align-items: center;
  gap: 20px;
  justify-items: stretch;
  position: relative;
  flex-direction: column;
  height: 300px;
  width: 400px;
`;