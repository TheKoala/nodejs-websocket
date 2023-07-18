import { inserirLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter-documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

socket.on("atualizar-lista-documentos", (nome) => {
  inserirLinkDocumento(nome);
});

function emitirAdicionaDocumento(novoDocumento) {
  socket.emit("adiciona-documento", novoDocumento);
}

export { emitirAdicionaDocumento };
