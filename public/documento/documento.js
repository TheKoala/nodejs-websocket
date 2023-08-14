import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo";
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({ texto: textoEditor.value, nomeDocumento });
});

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

function alertDelAndRedirect(nome) {
  if (nome === nomeDocumento) {
    alert(`O documento ${nome} foi deletado com sucesso`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertDelAndRedirect };
