import {createServer} from "http";
import express from "express";
import {Server} from "socket.io";
import path from "path";
import whatsAppClient from "@green-api/whatsapp-api-client";

const app = express();
const __dirname1 = path.resolve();
const PORT = process.env.PORT || 3000;

const httpServer = createServer();

console.log(PORT);
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "dist/")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(process.cwd(), "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

io.on("connection", socket => {

  socket.on("sendMessage", (data) => {
    const {idInstance, apiTokenInstance, number, message} = data;
    const restAPI = whatsAppClient.restAPI(({
      idInstance: `${idInstance}`,
      apiTokenInstance: `${apiTokenInstance}`
    }));

    restAPI.message.sendMessage(`${number}@c.us`, null, `${message}`);

  });

  socket.on("auth", (data) => {

    let restAPI = whatsAppClient.restAPI(({
      idInstance: `${data.idInstance}`,

      apiTokenInstance: `${data.apiTokenInstance}`
    }));

    restAPI.webhookService.startReceivingNotifications();

    restAPI.webhookService.onReceivingMessageText((body) => {

      const message = body?.messageData?.textMessageData?.textMessage;

      io.emit("message", message);
    });
  });
  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});