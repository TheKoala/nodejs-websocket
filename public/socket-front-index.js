import { inserirLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter-documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});
