import registrarEventosDocumentos from "./events/registrarEventosDocumentos.js";
import registrarEventosInicio from "./events/registrarEventosInicio.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registrarEventosDocumentos(socket, io);
  registrarEventosInicio(socket, io);

  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
