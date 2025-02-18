import {useEffect} from "react";
import {io} from "socket.io-client";
import {SubmitHandler, useForm} from "react-hook-form";

import {IParseString, IUserData, useAuthStore, useMessageStore} from "../../../../store";

let socket;

if (process.env.NODE_ENV === "development") {
  socket = io("localhost:3000");
} else {
  socket = io("https://mustangmidnight-jsy4rm--73342.stormkit.dev/");
}

interface IFormInput {
  text: string;
}

export const useSendMessageHook = () => {

  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm<IFormInput>();

  const messages = useMessageStore((state) => state.messages);

  const {receiveNotificationMessage, sendMessage} = useMessageStore((state) => state);
  const {number} = useAuthStore(state => state);

  const authData = localStorage.getItem("auth");
  const authParse: IParseString = JSON.parse(authData || "{}");
  const userData = localStorage.getItem("user");
  const userParse: IUserData = JSON.parse(userData || "{}");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });

    socket.emit("auth", authParse);

    socket.on("disconnect", () => {
      console.log("disconnect");
    });

    socket.on("message", data => {
      receiveNotificationMessage({text: data});
    });

    return () => {
      socket.off("connect");
      socket.off("auth");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    const user = localStorage.getItem("user");
    const userNumber: IUserData = JSON.parse(user || "{}");

    sendMessage(data);

    socket.emit("sendMessage", {
      idInstance: authParse.idInstance,
      apiTokenInstance: authParse.apiTokenInstance,
      number: userNumber.number,
      message: data.text
    });

    reset({text: ""});
    // return await axios.post(`${
    //     authParse.apiUrl ?
    //       authParse.apiUrl :
    //       API_URL
    //   }/waInstance${
    //     authParse.idInstance ?
    //       authParse.idInstance :
    //       ID_INSTANCE
    //   }/sendMessage/${
    //     authParse.apiTokenInstance ?
    //       authParse.apiTokenInstance :
    //       API_TOKEN_INSTANCE
    //   }`
    //   , {
    //     chatId: `${userNumber.number}@c.us`,
    //     message: data.text
    //   },
    // );
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    number,
    messages,
    userParse
  };
};