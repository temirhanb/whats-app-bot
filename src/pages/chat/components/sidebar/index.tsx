import * as React from "react";
import {Alert, Button, styled, TextField, Typography} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {useAddUserHook} from "../../hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Sidebar: React.FC = () => {
  const {register, onSubmit, userParse, handleSubmit, errors} = useAddUserHook();
  return (
    <Container>
      <Typography variant={"h4"}>Chats</Typography>
      <AddContactForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={"Add chat"}
          size={"small"}
          error={errors.number && true}
          helperText={errors.number && errors.number.message}
          {...register("number", {
            required: "Number is required.",
            minLength: {value: 4, message: "This input exceed min length."},
            maxLength: {value: 20, message: "This input exceed max length."}
          })}
          fullWidth
        />
        <Button type={"submit"}>
          <GroupAddIcon/>
        </Button>
      </AddContactForm>
      {userParse.number && (
        <UserContainer>
          <UserItem>
            <AccountCircleIcon/>
            <p>{userParse.number}</p>
          </UserItem>
        </UserContainer>
      )}
      {!userParse.number && (<Alert severity="warning">
        Please add user number
      </Alert>)}
    </Container>
  );
};

const Container = styled("div")`
  background: #111b21;
  border-radius: 6px 0 0 6px;
  padding: 10px 5px 0 10px;
`;

const AddContactForm = styled("form")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #202c33;
`;

const UserContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const UserItem = styled("div")`
  height: 50px;
  background: #202c33;
  width: 100%;
  padding: 5px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-left: 5px;
  }

  svg {
    margin-left: 10px;
    height: 40px;
    width: 40px;
  }
`;