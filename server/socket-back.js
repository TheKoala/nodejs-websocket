import "dotenv/config.js";
import registrarEventosCadastro from "./events/cadastro.js";
import registrarEventosDocumentos from "./events/documentos.js";
import registrarEventosInicio from "./events/inicio.js";
import registrarEventosLogin from "./events/login.js";
import io from "./server.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);
nspUsuarios.on("connection", (socket) => {
  registrarEventosDocumentos(socket, io);
  registrarEventosInicio(socket, io);

  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);

  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
