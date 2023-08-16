import registrarEventosCadastro from "./events/cadastro.js";
import registrarEventosDocumentos from "./events/documentos.js";
import registrarEventosInicio from "./events/inicio.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registrarEventosDocumentos(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventosCadastro(socket, io);

  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
