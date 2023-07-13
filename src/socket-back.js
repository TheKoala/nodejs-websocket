import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("texto_editor", ({texto, documento}) => {
    //"socket.broadcast.emit("texto_editor_clientes", texto);
    console.log(documento, texto)
    socket.to(documento).emit("texto_editor_clientes", texto);
  });

  socket.on("selecionar_documento", (documento) => {
    socket.join(documento);
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
