import {
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";

function registrarEventosDocumentos(socket, io) {
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

  socket.on("excluir_documento", async (nomeDocumento) => {
    const resultado = await excluirDocumento(nomeDocumento);
    if (resultado.deletedCount) {
      io.emit("excluir_documento_sucesso", nomeDocumento);
    }
  });
}

export default registrarEventosDocumentos;
