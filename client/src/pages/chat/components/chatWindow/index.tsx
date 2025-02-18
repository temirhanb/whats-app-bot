import React from "react";
import {Button, styled, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {useSendMessageHook} from "../../hooks";

export const ChatWindow: React.FC = () => {

  const {onSubmit, handleSubmit, errors, register, messages, number, userParse} = useSendMessageHook();

  return (
    <Container>
      <Header>header</Header>
      <Chat>
        {messages.map((item, index) => <ChatMessage key={index}>{item}</ChatMessage>)}
      </Chat>
      <FormSendingMessage onSubmit={handleSubmit(onSubmit)}>
        <TextField
          disabled={!userParse.number && number.length === 0}
          fullWidth
          size={"small"}
          error={errors.text && true}
          helperText={errors.text && errors.text.message}
          {...register("text", {
            required: "The message must not be empty.",
            maxLength: {value: 500, message: "Max length message 500"}
          })}
        />
        <Button disabled={!userParse.number && number.length === 0} type={"submit"}>
          <SendIcon/>
        </Button>

      </FormSendingMessage>
    </Container>
  );
};

const Container = styled("div")`
  background: #111b21;
  border-radius: 0 6px 6px 0;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  overflow: hidden;
`;

const Header = styled("div")`
  height: 50px;
  background: #202c33;
  border-radius: 0 6px 0 0;
  padding: 10px 0 0 10px;
`;

const Chat = styled("div")`
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: scroll;
  scrollbar-width: none;
  position: relative;
  align-items: flex-end;
  max-height: 100%;
`;

const ChatMessage = styled("div")`
  padding: 5px 10px;
  max-width: 75%;
  border-radius: 6px;
  background: #005c4b;
  margin-bottom: 3px;
`;

const FormSendingMessage = styled("form")`
  height: 60px;
  background: #202c33;
  border-radius: 0 0 6px 0;
  padding: 10px 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
