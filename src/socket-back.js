import io from "./server.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "Hello Java",
  },
  {
    nome: "Node",
    texto: "Hello Node",
  },
  {
    nome: "Socket.io",
    texto: "Hello Socketo ai ou",
  },
];

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    //"socket.broadcast.emit("texto_editor_clientes", texto);

    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      documento.texto = texto;

      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });

  socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      //"socket.emit("texto_documento", documento.texto);
      devolverTexto(documento.texto);
    }
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

function encontrarDocumento(nome) {
  return documentos.find((documento) => {
    return documento.nome === nome;
  });
}
