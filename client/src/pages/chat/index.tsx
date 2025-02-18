import React from "react";
import {ChatWindow, Sidebar} from "./components";
import {styled} from "@mui/material";

export const ChatPage: React.FC = () => {
  return (
    <Container>
      <Sidebar/>
      <ChatWindow/>
    </Container>
  );
};

const Container = styled("div")`
  display: grid;
  grid-template-columns: 300px 1fr;
  margin: 10px;
  width: 100%;
  gap: 0 5px;
`;