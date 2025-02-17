import React from "react";
import {styled} from "@mui/material";
import {AuthForm} from "./components";

export const AuthPage: React.FC = () => {

  return (
    <Container>
      <AuthForm/>
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;