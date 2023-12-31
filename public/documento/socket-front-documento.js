import { obterCookie } from "../utils/cookies.js";
import { alertDelAndRedirect, atualizaTextoEditor } from "./documento.js";

const socket = io("/usuarios", { auth: { token: obterCookie("tokenJwt") } });

function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("excluir_documento_sucesso", (nome) => {
  alertDelAndRedirect(nome);
});

//"socket.on("texto_documento", (texto) => {
//"  atualizaTextoEditor(texto);
//"});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/";
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
