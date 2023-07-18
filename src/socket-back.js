import {
  atualizaDocumento,
  criarDocumento,
  encontrarDocumento,
  listaDocumentos,
} from "./documentosDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id);

  socket.on("obter-documentos", async (devolverDocumentos) => {
    const documentos = await listaDocumentos();
    devolverDocumentos(documentos);
  });

  socket.on("adiciona-documento", async (novoDocumento) => {
    const resultado = await criarDocumento(novoDocumento);
    if(resultado.acknowledged) {
      io.emit("atualizar-lista-documentos", novoDocumento);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    //"socket.broadcast.emit("texto_editor_clientes", texto);

    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);
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
