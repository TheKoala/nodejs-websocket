import {
  criarDocumento,
  encontrarDocumento,
  listaDocumentos,
} from "../db/documentosDb.js";

function registrarEventosInicio(socket, io) {
  socket.on("obter-documentos", async (devolverDocumentos) => {
    const documentos = await listaDocumentos();
    devolverDocumentos(documentos);
  });

  socket.on("adiciona-documento", async (novoDocumento) => {
    const documentoExiste = (await encontrarDocumento(novoDocumento)) !== null;
    if (documentoExiste) {
      io.emit("documento-existente", novoDocumento);
    } else {
      const resultado = await criarDocumento(novoDocumento);
      if (resultado.acknowledged) {
        io.emit("atualizar-lista-documentos", novoDocumento);
      }
    }
  });
}

export default registrarEventosInicio;
