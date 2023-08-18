import "dotenv/config.js";
import registrarEventosCadastro from "./events/cadastro.js";
import registrarEventosDocumentos from "./events/documentos.js";
import registrarEventosInicio from "./events/inicio.js";
import registrarEventosLogin from "./events/login.js";
import io from "./server.js";

io.use((socket, next) => {
  next();
})

io.use((socket, next) => {
  next(new Error("usuario não logado"));
})

io.on("connection", (socket) => {
  registrarEventosDocumentos(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);

  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
