import { inserirLinkDocumento, removerDocumentoLista } from "./index.js";

const socket = io();

socket.emit("obter-documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

socket.on("atualizar-lista-documentos", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento-existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerDocumentoLista(nome);
});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/"
});

function emitirAdicionaDocumento(novoDocumento) {
  socket.emit("adiciona-documento", novoDocumento);
}

export { emitirAdicionaDocumento };
