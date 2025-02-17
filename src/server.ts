import {createServer} from "http";
import {Server} from "socket.io";
import whatsAppClient from "@green-api/whatsapp-api-client";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {

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

io.on("auth", async (data) => {
  console.log(data);

});

io.listen(3001);